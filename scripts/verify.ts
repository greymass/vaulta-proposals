import type { Action } from '@wharfkit/antelope'
import { checkCitationCommit, prependCitation } from '$lib/citation'
import { ROOT } from '$lib/constants'
import { COMMIT_FLAG, declaredFlags, flagValues, resolveFlags } from '$lib/flags'
import {
    compareActions,
    createMsigModuleLoader,
    fetchProposalRow,
    findMsigBuilder,
    isBoundMsigRef,
    lintMsigBuilders,
    resolveSlug,
} from '$lib/msig'
import { lintRepo } from '$lib/repo'
import { fetchTopicRow, lintTopicCitation } from '$lib/sentiment'
import type { MsigModule, ProposalFrontmatter } from '$lib/types'

const [vpArg] = process.argv.slice(2)

const { errors, proposals } = await lintRepo(ROOT)
if (errors.length) {
    console.error('verification failed:')
    for (const error of errors) console.error(`  - ${error}`)
    if (vpArg) {
        console.error(`the on-chain comparison for ${vpArg} did not run because conformance failed`)
    }
    process.exit(1)
}
console.log('✓ all proposals conform to their declared standard')

async function verifyMsigs(frontmatter: ProposalFrontmatter, slug: string): Promise<boolean> {
    const loadModule = createMsigModuleLoader(slug)
    let failed = false
    let bound = 0
    let linted = false
    for (const [index, ref] of frontmatter.msigs.entries()) {
        const entry = index + 1
        if (!isBoundMsigRef(ref)) {
            console.log(`○ ${ref.title ?? 'planned entry'}: not yet proposed on-chain; skipping`)
            continue
        }
        bound++
        const { proposer, proposal } = ref
        let module: MsigModule
        try {
            module = await loadModule()
        } catch (error) {
            const message = error instanceof Error ? error.message : String(error)
            console.error(`✗ ${proposer}/${proposal}: ${message}`)
            failed = true
            continue
        }
        if (!linted) {
            linted = true
            for (const error of lintMsigBuilders(module.msigs, frontmatter.msigs.length)) {
                console.error(`✗ proposals/${slug}/msig/index.ts: ${error}`)
                failed = true
            }
        }
        const found = findMsigBuilder(module.msigs, entry)
        if (!found) {
            console.error(`✗ ${proposer}/${proposal}: no builder declares entry ${entry}`)
            failed = true
            continue
        }
        // No command line to read from here, so a declared flag resolves from environment or default.
        const declared = declaredFlags(found.builder.flags)
        const { resolved, errors: flagErrors } = resolveFlags(declared, {})
        if (flagErrors.length) {
            console.error(`✗ ${proposer}/${proposal}: cannot rebuild entry ${entry}`)
            for (const error of flagErrors) console.error(`    ${error}`)
            failed = true
            continue
        }
        const builderFlags = Object.fromEntries(
            Object.entries(resolved).filter(([name]) => name !== COMMIT_FLAG),
        )
        let local: Action[]
        try {
            const ctx = {
                vp: frontmatter.vp,
                slug,
                commit: ref.commit,
                flags: flagValues(builderFlags),
            }
            local = prependCitation(found.name, found.builder, ctx, await found.builder.build(ctx))
        } catch (error) {
            const message = error instanceof Error ? error.message : String(error)
            console.error(`✗ ${proposer}/${proposal}: rebuilding entry ${entry} failed: ${message}`)
            failed = true
            continue
        }
        let onchain: Awaited<ReturnType<typeof fetchProposalRow>>
        try {
            onchain = await fetchProposalRow(ref)
        } catch (error) {
            const message = error instanceof Error ? error.message : String(error)
            console.error(`✗ ${proposer}/${proposal}: ${message}`)
            failed = true
            continue
        }
        const mismatches = compareActions(local, onchain.transaction.actions)
        if (mismatches.length) {
            console.error(`✗ ${proposer}/${proposal}:`)
            for (const mismatch of mismatches) console.error(`    ${mismatch}`)
            failed = true
        } else {
            const approvals = onchain.approvals
                ? ` (approvals: ${onchain.approvals.provided}/${onchain.approvals.requested})`
                : ''
            console.log(`✓ ${proposer}/${proposal}: on-chain msig matches local code${approvals}`)
        }
    }
    if (bound === 0) {
        console.log(
            `${frontmatter.vp}: every msigs entry is still planned, so no on-chain comparison was made`,
        )
    }
    return failed
}

// A topic that frontmatter names must exist; its citation is advisory under VPS-1, so it only warns.
async function verifySentiment(frontmatter: ProposalFrontmatter, slug: string): Promise<boolean> {
    let failed = false
    for (const ref of frontmatter.sentiment) {
        const label = `${ref.contract}/${ref.topic}`
        let topic: Awaited<ReturnType<typeof fetchTopicRow>>
        try {
            topic = await fetchTopicRow(ref)
        } catch (error) {
            const message = error instanceof Error ? error.message : String(error)
            console.error(`✗ ${label}: ${message}`)
            failed = true
            continue
        }
        const check = lintTopicCitation(topic.description, frontmatter.vp, slug)
        const problems = [
            ...check.problems,
            ...(check.parsed ? checkCitationCommit(check.parsed) : []),
        ]
        for (const problem of problems) console.warn(`warning: ${label}: ${problem}`)
        if (check.cited && problems.length === 0) {
            console.log(
                `✓ ${label}: topic exists and cites ${frontmatter.vp} at ${check.parsed?.commit.slice(0, 7)}`,
            )
        } else if (!check.cited && problems.length === 0) {
            console.log(`○ ${label}: topic exists and carries no citation, which VPS-1 permits`)
        } else {
            console.log(`○ ${label}: topic exists; its citation is not conformant`)
        }
    }
    return failed
}

if (vpArg) {
    const slug = resolveSlug(vpArg)
    const proposal = proposals.find((p) => p.slug === slug)
    if (!proposal) {
        console.error(`no proposal directory named ${slug}`)
        process.exit(1)
    }
    const frontmatter = proposal.frontmatter
    let failed = false
    if (frontmatter.msigs.length === 0) {
        console.log(`${frontmatter.vp} has no msigs listed in frontmatter`)
    } else {
        failed = (await verifyMsigs(frontmatter, slug)) || failed
    }
    if (frontmatter.sentiment.length === 0) {
        console.log(`${frontmatter.vp} has no sentiment topics listed in frontmatter`)
    } else {
        failed = (await verifySentiment(frontmatter, slug)) || failed
    }
    process.exit(failed ? 1 : 0)
}
