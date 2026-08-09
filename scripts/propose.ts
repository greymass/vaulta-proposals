import { join } from 'node:path'
import { Serializer, Transaction } from '@wharfkit/antelope'
import { proposerPermission, ROOT } from '../lib/constants'
import { parseProposal, validateFrontmatter } from '../lib/frontmatter'
import { loadMsigModule, resolveSlug } from '../lib/msig'
import { getTopProducers, makeProposerSession } from '../lib/wharf'

const [vpArg, proposalName] = process.argv.slice(2).filter((arg) => !arg.startsWith('--'))
const broadcast = process.argv.includes('--broadcast')
if (!vpArg || !proposalName) {
    console.error('usage: bun run propose <vp> <proposal-name> [--broadcast]')
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

const actions = await builder()
const header = {
    expiration: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 19),
    ref_block_num: 0,
    ref_block_prefix: 0,
}
const trx = Transaction.from({ ...header, actions })

console.log(`msig ${slug} :: ${proposalName}`)
console.log(JSON.stringify(Serializer.objectify(trx), null, 4))

if (!broadcast) {
    console.log('\ndry run only; pass --broadcast to propose on-chain')
    process.exit(0)
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
console.log(
    `review at https://unicove.com/en/vaulta/msig/${proposerPermission().actor}/${proposalName}`,
)
