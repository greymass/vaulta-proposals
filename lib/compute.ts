import {
    type Action,
    PackedTransaction,
    Serializer,
    SignedTransaction,
    Transaction,
} from '@wharfkit/antelope'
import { client } from './wharf'

interface TraceException {
    message?: string
    stack?: { format?: string; data?: Record<string, unknown> }[]
}

export interface ComputedActionTrace {
    receiver: string
    act: { account: string; name: string; data?: unknown }
    account_ram_deltas?: { account: string; delta: number }[]
}

export interface ComputedTransaction {
    except?: TraceException | null
    action_traces?: ComputedActionTrace[]
}

export interface ComputeReport {
    executes: boolean
    error?: string
    actions: string[]
    ramDeltas: [string, number][]
    transfers: string[]
}

export function formatException(except: TraceException): string {
    const entry = except.stack?.[0]
    if (!entry?.format) return except.message ?? 'unknown error'
    const data = entry.data ?? {}
    return entry.format.replace(/\$\{(\w+)\}/g, (match, key) =>
        key in data ? String(data[key]) : match,
    )
}

// Notifications repeat their parent's act, so only traces where the receiver is the contract count.
export function reportComputed(processed: ComputedTransaction): ComputeReport {
    if (processed.except) {
        return {
            executes: false,
            error: formatException(processed.except),
            actions: [],
            ramDeltas: [],
            transfers: [],
        }
    }
    const traces = processed.action_traces ?? []
    const ram = new Map<string, number>()
    for (const trace of traces) {
        for (const { account, delta } of trace.account_ram_deltas ?? []) {
            ram.set(account, (ram.get(account) ?? 0) + delta)
        }
    }
    const executed = traces.filter((trace) => trace.receiver === trace.act.account)
    const transfers = executed
        .filter((trace) => trace.act.name === 'transfer')
        .map((trace) => {
            const data = trace.act.data as { from: string; to: string; quantity: string }
            return `${data.from} -> ${data.to} ${data.quantity} (${trace.act.account})`
        })
    return {
        executes: true,
        actions: executed.map((trace) => `${trace.act.account}::${trace.act.name}`),
        ramDeltas: [...ram].sort(([a], [b]) => a.localeCompare(b)),
        transfers,
    }
}

// The size eosio.msig stores, since propose sends this same shape; expiration does not change it.
export function proposedTransactionBytes(actions: Action[]): number {
    const trx = Transaction.from({
        expiration: '1970-01-01T00:00:00',
        ref_block_num: 0,
        ref_block_prefix: 0,
        actions,
    })
    return Serializer.encode({ object: trx }).array.length
}

// compute_transaction runs against head state and discards the result, so it needs no signatures.
export async function computeActions(actions: Action[]): Promise<ComputedTransaction> {
    const info = await client.v1.chain.get_info()
    const trx = Transaction.from({ ...info.getTransactionHeader(120), actions })
    const transaction = PackedTransaction.fromSigned(
        SignedTransaction.from({ ...trx, signatures: [] }),
    )
    const result = await client.call<{ processed: ComputedTransaction }>({
        path: '/v1/chain/compute_transaction',
        params: { transaction },
    })
    return result.processed
}
