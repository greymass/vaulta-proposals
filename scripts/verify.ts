import type { Action } from '@wharfkit/antelope'
import { prependCitation } from '$lib/citation'
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
import type { MsigModule } from '$lib/types'

const [vpArg] = process.argv.slice(2)

const { errors, proposals } = await lintRepo(ROOT)
if (errors.length) {
    console.error('verification failed:')
    for (const error of errors) console.error(`  - ${error}`)
    if (vpArg) {
        console.error(
            `the on-chain msig comparison for ${vpArg} did not run because conformance failed`,
        )
    }
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
    process.exit(failed ? 1 : 0)
}
