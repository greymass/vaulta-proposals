import { join } from 'node:path'
import { Serializer, Transaction } from '@wharfkit/antelope'
import {
    COMMIT_PATTERN,
    checkCitationActions,
    lintCitationActions,
    prependCitation,
} from '$lib/citation'
import { PROPOSAL_LIFETIME_DAYS, proposerPermission, ROOT } from '$lib/constants'
import {
    COMMIT_FLAG,
    declaredFlags,
    flagEnvName,
    flagValues,
    parseArgs,
    resolveFlags,
    sourceLabel,
    unknownFlags,
} from '$lib/flags'
import { parseProposal, validateFrontmatter } from '$lib/frontmatter'
import { loadMsigModule, resolveSlug } from '$lib/msig'
import type { MsigFlag } from '$lib/types'
import { getTopProducers, makeProposerSession } from '$lib/wharf'

const args = parseArgs(process.argv.slice(2))
const [vpArg, proposalName] = args.positionals
const broadcast = args.switches.has('broadcast')
const help = args.switches.has('help')

const USAGE = 'usage: bun run propose <vp> <proposal-name> [--commit <sha>] [--broadcast]'

function usage(declared?: Record<string, MsigFlag>, log: (line: string) => void = console.error) {
    log(USAGE)
    log('\nevery flag may also be set as the environment variable named beside it')
    for (const [name, flag] of Object.entries(declared ?? declaredFlags())) {
        const fallback = flag.default === undefined ? 'required' : `default ${flag.default}`
        log(`  --${name} <value>  ${flag.description}`)
        log(`      ${flagEnvName(name)}, ${fallback}`)
    }
}

if (args.errors.length) {
    for (const error of args.errors) console.error(error)
    usage()
    process.exit(1)
}
if (!vpArg || !proposalName) {
    if (help) {
        usage(undefined, console.log)
        process.exit(0)
    }
    console.error(USAGE)
    process.exit(1)
}

const slug = resolveSlug(vpArg)
const markdown = await Bun.file(join(ROOT, 'proposals', slug, 'proposal.md')).text()
const { value: frontmatter } = validateFrontmatter(parseProposal(markdown).frontmatter, slug)
if (!frontmatter) {
    console.error(`invalid frontmatter in ${slug}; run \`bun run index\` for details`)
    process.exit(1)
}

const module = await loadMsigModule(slug)
const builder = module.msigs[proposalName]
if (!builder) {
    console.error(
        `no msig named ${proposalName}; available: ${Object.keys(module.msigs).join(', ')}`,
    )
    process.exit(1)
}

const declared = declaredFlags(builder.flags)
if (help) {
    usage(declared, console.log)
    process.exit(0)
}

const unknown = unknownFlags(declared, args.flags)
if (unknown.length) {
    console.error(
        `unknown flag ${unknown.map((name) => `--${name}`).join(', ')}; ${proposalName} takes ${Object.keys(
            declared,
        )
            .map((name) => `--${name}`)
            .join(', ')}`,
    )
    process.exit(1)
}

const { resolved, errors: flagErrors } = resolveFlags(declared, args.flags)
if (flagErrors.length) {
    for (const error of flagErrors) console.error(error)
    process.exit(1)
}

// Printed so a stale environment value cannot silently change the bytes being proposed.
for (const [name, { value, source }] of Object.entries(resolved)) {
    console.error(`${name}: ${value} (${sourceLabel(name, source)})`)
}

const commit = resolved[COMMIT_FLAG].value
if (!COMMIT_PATTERN.test(commit)) {
    console.error(`commit must be a 40-character lowercase hex sha, got ${commit}`)
    process.exit(1)
}

const builderFlags = Object.fromEntries(
    Object.entries(resolved).filter(([name]) => name !== COMMIT_FLAG),
)
const ctx = {
    vp: frontmatter.vp,
    slug,
    commit,
    flags: flagValues(builderFlags),
}
const actions = prependCitation(proposalName, builder, ctx, await builder.build(ctx))
const header = {
    expiration: new Date(Date.now() + PROPOSAL_LIFETIME_DAYS * 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 19),
    ref_block_num: 0,
    ref_block_prefix: 0,
}
const trx = Transaction.from({ ...header, actions })

console.log(`msig ${slug} :: ${proposalName}`)
console.log(JSON.stringify(Serializer.objectify(trx), null, 4))

const citationProblems = [...lintCitationActions(actions), ...checkCitationActions(actions)]

if (!broadcast) {
    for (const problem of citationProblems) console.warn(`\n⚠ ${problem}`)
    if (citationProblems.length) {
        console.warn('  a broadcast refuses while the citation has problems')
    }
    console.log('\ndry run only; pass --broadcast to propose on-chain')
    process.exit(0)
}

if (citationProblems.length) {
    console.error('refusing to broadcast; the citation is not valid:')
    for (const problem of citationProblems) console.error(`  - ${problem}`)
    process.exit(1)
}

const requested = await getTopProducers()
const session = makeProposerSession()
const result = await session.transact({
    action: {
        account: 'eosio.msig',
        name: 'propose',
        authorization: [proposerPermission()],
        data: {
            proposer: proposerPermission().actor,
            proposal_name: proposalName,
            requested,
            trx,
        },
    },
})
console.log('proposed:', String(result.resolved?.transaction.id))
console.log(`proposer: ${proposerPermission().actor}`)
console.log(`proposal name: ${proposalName}`)
