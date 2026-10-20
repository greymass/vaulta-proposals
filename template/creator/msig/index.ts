import { ABI, Action } from '@wharfkit/antelope'
import type { MsigBuilder } from '$lib/types'

const CONTRACT = 'gift.vaulta'
const CREATOR = 'youraccount'
const DAILY_QUOTA_BYTES = '262144'

const abi = ABI.from({
    version: 'eosio::abi/1.2',
    structs: [
        {
            name: 'addcreator',
            base: '',
            fields: [
                { name: 'creator', type: 'name' },
                { name: 'daily_quota_bytes', type: 'int64' },
            ],
        },
    ],
    actions: [{ name: 'addcreator', type: 'addcreator', ricardian_contract: '' }],
})

const contract = { actor: CONTRACT, permission: 'active' }

export const msigs: Record<string, MsigBuilder> = {
    addcreator: {
        entry: 1,
        citationAuth: [contract],
        flags: {
            creator: { description: 'account to register as a creator', default: CREATOR },
            'daily-quota-bytes': {
                description: 'daily quota in bytes; at least 1,972',
                default: DAILY_QUOTA_BYTES,
            },
        },
        build: async (ctx) => [
            Action.from(
                {
                    account: CONTRACT,
                    name: 'addcreator',
                    authorization: [contract],
                    data: {
                        creator: ctx.flags.creator,
                        daily_quota_bytes: Number(ctx.flags['daily-quota-bytes']),
                    },
                },
                abi,
            ),
        ],
    },
}
