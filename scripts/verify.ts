import { ROOT } from '../lib/constants'
import { compareActions, fetchProposalRow, loadMsigModule, resolveSlug } from '../lib/msig'
import { lintRepo } from '../lib/repo'

const [vpArg] = process.argv.slice(2)

const { errors, proposals } = await lintRepo(ROOT)
if (errors.length) {
    console.error('verification failed:')
    for (const error of errors) console.error(`  - ${error}`)
    process.exit(1)
}
console.log('✓ all proposals conform to their declared standard')

if (vpArg) {
    const slug = resolveSlug(vpArg)
    const proposal = proposals.find((p) => p.slug === slug)
    if (!proposal) {
        console.error(`no proposal directory named ${slug}`)
        process.exit(1)
    }
    const frontmatter = proposal.frontmatter
    if (frontmatter.msigs.length === 0) {
        console.log(`${frontmatter.vp} has no msigs listed in frontmatter; nothing to verify`)
        process.exit(0)
    }
    const module = await loadMsigModule(slug)
    let failed = false
    for (const ref of frontmatter.msigs) {
        const builder = module.msigs[ref.proposal]
        if (!builder) {
            console.error(
                `✗ ${ref.proposer}/${ref.proposal}: no local msig code named ${ref.proposal}`,
            )
            failed = true
            continue
        }
        const [local, onchain] = await Promise.all([builder(), fetchProposalRow(ref)])
        const mismatches = compareActions(local, onchain.transaction.actions)
        if (mismatches.length) {
            console.error(`✗ ${ref.proposer}/${ref.proposal}:`)
            for (const mismatch of mismatches) console.error(`    ${mismatch}`)
            failed = true
        } else {
            const approvals = onchain.approvals
                ? ` (approvals: ${onchain.approvals.provided}/${onchain.approvals.requested})`
                : ''
            console.log(
                `✓ ${ref.proposer}/${ref.proposal}: on-chain msig matches local code${approvals}`,
            )
        }
    }
    process.exit(failed ? 1 : 0)
}
