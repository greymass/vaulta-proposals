import type { Action } from '@wharfkit/antelope'
import { prependCitation } from '$lib/citation'
import { computeActions, proposedTransactionBytes, reportComputed } from '$lib/compute'
import { COMMIT_FLAG, declaredFlags, flagValues, parseArgs, resolveFlags } from '$lib/flags'
import { type ResolvedMsig, resolveMsigBuilder } from '$lib/msig'

const USAGE = 'usage: bun run compute-msig <vp> <proposal-name> [--commit <sha>]'

const args = parseArgs(process.argv.slice(2))
const [vpArg, proposalName] = args.positionals

if (args.errors.length) {
    for (const error of args.errors) console.error(error)
    console.error(USAGE)
    process.exit(1)
}
if (!vpArg || !proposalName) {
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
const { resolved, errors: flagErrors } = resolveFlags(declared, args.flags)
if (flagErrors.length) {
    for (const error of flagErrors) console.error(error)
    process.exit(1)
}

const builderFlags = Object.fromEntries(
    Object.entries(resolved).filter(([name]) => name !== COMMIT_FLAG),
)
const ctx = {
    vp,
    slug,
    commit: resolved[COMMIT_FLAG].value,
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

const report = reportComputed(await computeActions(actions))

console.log(`msig ${slug} :: ${proposalName}`)
console.log(`proposed transaction: ${proposedTransactionBytes(actions)} bytes`)
if (!report.executes) {
    console.log(`does not execute: ${report.error}`)
    process.exit(1)
}
console.log('executes against current chain state; nothing was broadcast')
for (const action of report.actions) console.log(`  ${action}`)
for (const [account, delta] of report.ramDeltas) console.log(`  ram ${account} ${delta}`)
for (const transfer of report.transfers) console.log(`  transfer ${transfer}`)
