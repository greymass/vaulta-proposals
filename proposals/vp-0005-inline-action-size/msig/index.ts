import { Types } from '$lib/codegen/eosio'
import { eosio } from '$lib/contracts'
import type { MsigBuilder } from '$lib/types'
import { client } from '$lib/wharf'

// EOS mainnet `eosio` `global`, read 2026-10-20; only max_inline_action_size differs from it.
export const PARAMS = {
    max_block_net_usage: 1048576,
    target_block_net_usage_pct: 10000,
    max_transaction_net_usage: 524288,
    base_per_transaction_net_usage: 12,
    net_usage_leeway: 500,
    context_free_discount_net_usage_num: 20,
    context_free_discount_net_usage_den: 100,
    max_block_cpu_usage: 200000,
    target_block_cpu_usage_pct: 10,
    max_transaction_cpu_usage: 150000,
    min_transaction_cpu_usage: 100,
    max_transaction_lifetime: 3600,
    deferred_trx_expiration_window: 600,
    max_transaction_delay: 3888000,
    max_inline_action_size: 1048576,
    max_inline_action_depth: 10,
    max_authority_depth: 10,
}

export const CHANGED: (keyof typeof PARAMS)[] = ['max_inline_action_size']

const system = { actor: 'eosio', permission: 'active' }

export function compareParams(live: Record<string, unknown>) {
    const rows = Object.entries(PARAMS).map(([field, proposed]) => {
        const current = Number(live[field])
        return { field, live: current, proposed, changed: current !== proposed }
    })
    const drift = rows.filter(
        (row) => row.changed !== CHANGED.includes(row.field as keyof typeof PARAMS),
    )
    return { rows, drift }
}

export const msigs: Record<string, MsigBuilder> = {
    vp5setparams: {
        entry: 1,
        citationAuth: [system],
        check: async () => {
            const result = await client.v1.chain.get_table_rows({
                code: 'eosio',
                scope: 'eosio',
                table: 'global',
                json: true,
            })
            const { rows, drift } = compareParams(result.rows[0] ?? {})
            const width = Math.max(...rows.map((row) => row.field.length))
            console.error(
                `${'field'.padEnd(width)}  ${'live'.padStart(10)}  ${'proposed'.padStart(10)}`,
            )
            for (const row of rows) {
                console.error(
                    `${row.field.padEnd(width)}  ${String(row.live).padStart(10)}  ${String(row.proposed).padStart(10)}${row.changed ? '  changed' : ''}`,
                )
            }
            if (drift.length) {
                throw new Error(
                    `live global differs from the pinned values outside ${CHANGED.join(', ')}: ${drift.map((row) => row.field).join(', ')}`,
                )
            }
        },
        build: async () => [
            eosio.action(
                'setparams',
                { params: Types.blockchain_parameters_v1.from(PARAMS) },
                { authorization: [system] },
            ),
        ],
    },
}
