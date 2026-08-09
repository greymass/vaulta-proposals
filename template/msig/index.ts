import { Action } from '@wharfkit/antelope'
import type { MsigBuilder } from '../../lib/types'

// Example msig definition. Key = the on-chain proposal name (also listed in
// this proposal's frontmatter `msigs` once proposed).
export const msigs: Record<string, MsigBuilder> = {
    examplemsig: async () => [
        Action.from({
            account: 'eosio',
            name: 'buyrambytes',
            authorization: [{ actor: 'eosio', permission: 'active' }],
            data: {
                payer: 'eosio',
                receiver: 'eosio',
                bytes: 8192,
            },
        }),
    ],
}
