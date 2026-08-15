import { readdirSync } from 'node:fs'
import { join } from 'node:path'
import { type Action, Name, PackedTransaction, Serializer, Transaction } from '@wharfkit/antelope'
import { ROOT as root } from './constants'
import type { MsigModule, MsigRef } from './types'
import { client } from './wharf'

export function resolveSlug(vpArg: string): string {
    const normalized = vpArg.toLowerCase().replace(/^vp-?/, '')
    const prefix = `vp-${normalized.padStart(4, '0')}-`
    const matches = readdirSync(join(root, 'proposals')).filter((name) => name.startsWith(prefix))
    if (matches.length !== 1) {
        throw new Error(
            `expected exactly one proposal directory matching ${prefix}*, found ${matches.length}`,
        )
    }
    return matches[0]
}

export async function loadMsigModule(slug: string): Promise<MsigModule> {
    const module = await import(join(root, 'proposals', slug, 'msig', 'index.ts'))
    if (!module.msigs || typeof module.msigs !== 'object') {
        throw new Error(
            `proposals/${slug}/msig/index.ts must export \`msigs: Record<string, MsigBuilder>\``,
        )
    }
    return module as MsigModule
}

export function compareActions(local: Action[], onchain: Action[]): string[] {
    const mismatches: string[] = []
    if (local.length !== onchain.length) {
        mismatches.push(`action count: local ${local.length} vs on-chain ${onchain.length}`)
        return mismatches
    }
    local.forEach((action, i) => {
        const other = onchain[i]
        for (const field of ['account', 'name'] as const) {
            if (!action[field].equals(other[field])) {
                mismatches.push(
                    `action ${i} ${field}: local ${action[field]} vs on-chain ${other[field]}`,
                )
            }
        }
        const authLocal = JSON.stringify(Serializer.objectify(action.authorization))
        const authChain = JSON.stringify(Serializer.objectify(other.authorization))
        if (authLocal !== authChain) {
            mismatches.push(
                `action ${i} authorization: local ${authLocal} vs on-chain ${authChain}`,
            )
        }
        if (String(action.data) !== String(other.data)) {
            mismatches.push(
                `action ${i} data (hex): local ${action.data} vs on-chain ${other.data}`,
            )
        }
    })
    return mismatches
}

export async function fetchProposalRow(ref: MsigRef & { proposer: string; proposal: string }) {
    const result = await client.v1.chain.get_table_rows({
        code: 'eosio.msig',
        scope: ref.proposer,
        table: 'proposal',
        lower_bound: Name.from(ref.proposal),
        upper_bound: Name.from(ref.proposal),
        limit: 1,
        json: true,
    })
    const row = result.rows[0]
    if (!row) {
        throw new Error(`msig ${ref.proposer}/${ref.proposal} not found on-chain`)
    }
    const transaction = Transaction.from(
        PackedTransaction.from({
            packed_trx: row.packed_transaction,
            signatures: [],
        }).getTransaction(),
    )
    let approvals: { requested: number; provided: number } | undefined
    const approvalsResult = await client.v1.chain.get_table_rows({
        code: 'eosio.msig',
        scope: ref.proposer,
        table: 'approvals2',
        lower_bound: Name.from(ref.proposal),
        upper_bound: Name.from(ref.proposal),
        limit: 1,
        json: true,
    })
    if (approvalsResult.rows[0]) {
        approvals = {
            requested: approvalsResult.rows[0].requested_approvals?.length ?? 0,
            provided: approvalsResult.rows[0].provided_approvals?.length ?? 0,
        }
    }
    return { transaction, approvals }
}
