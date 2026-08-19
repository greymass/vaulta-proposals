import { type Action, Serializer, Transaction } from '@wharfkit/antelope'
import {
    COMMIT_PATTERN,
    checkCitationActions,
    lintCitationActions,
    prependCitation,
} from '$lib/citation'
import { PROPOSAL_LIFETIME_DAYS, proposerPermission } from '$lib/constants'
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
import { type ResolvedMsig, resolveMsigBuilder } from '$lib/msig'
import { summarizeActions } from '$lib/summary'
import type { MsigFlag } from '$lib/types'
import { getTopProducers, makeProposerSession } from '$lib/wharf'

const args = parseArgs(process.argv.slice(2))
const [vpArg, proposalName] = args.positionals
const broadcast = args.switches.has('broadcast')
const summary = args.switches.has('summary')
const help = args.switches.has('help')

const USAGE =
    'usage: bun run propose <vp> <proposal-name> [--commit <sha>] [--summary] [--broadcast]'

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

let resolvedMsig: ResolvedMsig
try {
    resolvedMsig = await resolveMsigBuilder(vpArg, proposalName)
} catch (error) {
    console.error(error instanceof Error ? error.message : String(error))
    process.exit(1)
}
const { slug, vp, builder } = resolvedMsig

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
    vp,
    slug,
    commit,
    flags: flagValues(builderFlags),
}
let actions: Action[]
try {
    actions = prependCitation(proposalName, builder, ctx, await builder.build(ctx))
} catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.error(`building ${slug} :: ${proposalName} failed: ${message}`)
    process.exit(1)
}
const header = {
    expiration: new Date(Date.now() + PROPOSAL_LIFETIME_DAYS * 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 19),
    ref_block_num: 0,
    ref_block_prefix: 0,
}
const trx = Transaction.from({ ...header, actions })

console.log(`msig ${slug} :: ${proposalName}`)
if (summary) {
    for (const line of summarizeActions(actions)) console.log(line)
} else {
    console.log(JSON.stringify(Serializer.objectify(trx), null, 4))
}

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
