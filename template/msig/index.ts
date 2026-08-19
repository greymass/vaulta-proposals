import { eosio } from '$lib/contracts'
import type { MsigBuilder } from '$lib/types'

// Key = the on-chain proposal name; `entry` = one-based position in frontmatter `msigs`; a declared flag reaches `build` through `ctx.flags`; `citationAuth` authorizes the VPS-1 citation the tooling prepends as action zero, so `build` returns only this step's own actions.
export const msigs: Record<string, MsigBuilder> = {
    examplemsig: {
        entry: 1,
        citationAuth: [{ actor: 'eosio', permission: 'active' }],
        flags: {
            'ram-bytes': { description: 'bytes of RAM to buy', default: '8192' },
        },
        build: async (ctx) => [
            eosio.action(
                'buyrambytes',
                { payer: 'eosio', receiver: 'eosio', bytes: Number(ctx.flags['ram-bytes']) },
                { authorization: [{ actor: 'eosio', permission: 'active' }] },
            ),
        ],
    },
}
