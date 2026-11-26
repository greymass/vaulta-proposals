import { existsSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import {
    type Action,
    Name,
    PackedTransaction,
    Serializer,
    Transaction,
    type TransactionType,
} from '@wharfkit/antelope'
import { ROOT as root } from './constants'
import { parseProposal, validateFrontmatter } from './frontmatter'
import type { BoundMsigRef, MsigBuilder, MsigModule, MsigRef } from './types'
import { client, historyClient } from './wharf'

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

export function msigModulePath(slug: string): string {
    return join(root, 'proposals', slug, 'msig', 'index.ts')
}

export function isBoundMsigRef(ref: MsigRef): ref is BoundMsigRef {
    return ref.proposer !== undefined && ref.proposal !== undefined && ref.commit !== undefined
}

export async function loadMsigModule(slug: string): Promise<MsigModule> {
    const path = msigModulePath(slug)
    if (!existsSync(path)) {
        throw new Error(
            `proposals/${slug}/msig/index.ts does not exist; an entry naming a proposer and proposal name needs builder code that rebuilds its actions`,
        )
    }
    const module = await import(path)
    if (!module.msigs || typeof module.msigs !== 'object') {
        throw new Error(
            `proposals/${slug}/msig/index.ts must export \`msigs: Record<string, MsigBuilder>\``,
        )
    }
    return module as MsigModule
}

export interface ResolvedMsig {
    slug: string
    vp: string
    name: string
    builder: MsigBuilder
}

// The one path from `<vp> <proposal-name>` to a builder, so `propose` and `hash-msig` cannot disagree.
export async function resolveMsigBuilder(
    vpArg: string,
    proposalName: string,
): Promise<ResolvedMsig> {
    const slug = resolveSlug(vpArg)
    const markdown = await Bun.file(join(root, 'proposals', slug, 'proposal.md')).text()
    const { value: frontmatter } = validateFrontmatter(parseProposal(markdown).frontmatter, slug)
    if (!frontmatter) {
        throw new Error(`invalid frontmatter in ${slug}; run \`bun run index\` for details`)
    }
    const module = await loadMsigModule(slug)
    const builder = module.msigs[proposalName]
    if (!builder) {
        throw new Error(
            `no msig named ${proposalName}; available: ${Object.keys(module.msigs).join(', ')}`,
        )
    }
    return { slug, vp: frontmatter.vp, name: proposalName, builder }
}

export function lintMsigBuilders(builders: Record<string, MsigBuilder>, entryCount: number) {
    const errors: string[] = []
    const claims = new Map<number, string[]>()
    for (const [name, builder] of Object.entries(builders)) {
        const entry = builder?.entry
        if (typeof entry !== 'number' || !Number.isInteger(entry) || entry < 1) {
            errors.push(
                `builder ${name} must declare \`entry\` as a one-based frontmatter position`,
            )
            continue
        }
        if (entry > entryCount) {
            errors.push(
                `builder ${name} declares entry ${entry}, but the frontmatter msigs list has ${entryCount} ${entryCount === 1 ? 'entry' : 'entries'}`,
            )
            continue
        }
        claims.set(entry, [...(claims.get(entry) ?? []), name])
    }
    for (const [entry, names] of [...claims].sort(([a], [b]) => a - b)) {
        if (names.length > 1) {
            errors.push(
                `builders ${names.join(', ')} all declare entry ${entry}; an entry is enacted by at most one builder`,
            )
        }
    }
    return errors
}

export function findMsigBuilder(builders: Record<string, MsigBuilder>, entry: number) {
    const found = Object.entries(builders).find(([, builder]) => builder?.entry === entry)
    return found ? { name: found[0], builder: found[1] } : undefined
}

// Defers the import so a proposal whose every entry is still planned never resolves the module.
export function createMsigModuleLoader(slug: string): () => Promise<MsigModule> {
    let pending: Promise<MsigModule> | undefined
    return () => {
        pending ??= loadMsigModule(slug)
        return pending
    }
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

export async function fetchProposalRow(ref: BoundMsigRef) {
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
    if (!row) return fetchProposalHistory(ref)
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
    const expired = transaction.expiration.toMilliseconds() < Date.now()
    const status: ProposalStatus = expired ? 'expired' : 'proposed'
    return { transaction, approvals, status, trxId: undefined as string | undefined }
}

export type ProposalStatus = 'proposed' | 'executed' | 'cancelled' | 'expired'

interface ProposalHistoryResponse {
    status: ProposalStatus
    transaction: TransactionType
    requested_approvals?: unknown[]
    provided_approvals?: unknown[]
    executed_trx_id?: string | null
    cancelled_trx_id?: string | null
}

// The msig history API (`@wharfkit/msigs`) keeps proposals that executed, or were cancelled, after the table drops them.
async function fetchProposalHistory(ref: BoundMsigRef) {
    let row: ProposalHistoryResponse
    try {
        row = await historyClient.call<ProposalHistoryResponse>({
            path: '/v1/proposals/get_proposal',
            params: { proposer: ref.proposer, proposal_name: ref.proposal },
        })
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error)
        throw new Error(
            `msig ${ref.proposer}/${ref.proposal} is not in the eosio.msig table, and the msig history API returned: ${message}`,
        )
    }
    return {
        transaction: Transaction.from(row.transaction),
        approvals: {
            requested: row.requested_approvals?.length ?? 0,
            provided: row.provided_approvals?.length ?? 0,
        },
        status: row.status,
        trxId:
            (row.status === 'executed' ? row.executed_trx_id : row.cancelled_trx_id) ?? undefined,
    }
}

export function expectedProposalStatus(status: string): ProposalStatus | undefined {
    if (status === 'active') return 'proposed'
    if (status === 'executed' || status === 'cancelled' || status === 'expired') return status
    return undefined
}
