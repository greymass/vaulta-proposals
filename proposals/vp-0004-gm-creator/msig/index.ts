import { createHash } from 'node:crypto'
import { homedir } from 'node:os'
import { join } from 'node:path'
import { ABI, Action, Serializer } from '@wharfkit/antelope'
import { ASSERT_CONTRACT, assertAbi, type GuardManifest, manifestId } from '$lib/manifest'
import type { MsigBuilder } from '$lib/types'

const CONTRACT = 'gift.vaulta'
const CREATOR = 'gm'
const DAILY_QUOTA_BYTES = '262144'

const MAINNET_CHAIN_PARAMS_HASH = '36d6bc6d57dacd4a458e3ff1a384434c3af5c7110708a006654fcc2bcca5a88c'

// gm registers this with `bun run manifest VP-0004` before exec.
export const GUARD_MANIFEST: GuardManifest = {
    account: CREATOR,
    domain: 'https://github.com/greymass/vaulta-proposals',
    appmeta: 'VP-0004',
    whitelist: [{ contract: CONTRACT, action: 'addcreator' }],
}

function sha256(bytes: Uint8Array): string {
    return createHash('sha256').update(bytes).digest('hex')
}

export const GUARD_MANIFEST_ID = manifestId(GUARD_MANIFEST)

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
            'gift-abi': {
                description:
                    'gift.abi from the build VP-0001 pins; its hash must equal the ABI vp1deploy sets',
                default: join(homedir(), 'projects/vaulta-contracts/contracts/gift/build/gift.abi'),
            },
            'chain-params-hash': {
                description: 'hash in eosio.assert chain.params on the target chain',
                default: MAINNET_CHAIN_PARAMS_HASH,
            },
        },
        build: async (ctx) => {
            const giftAbi = ABI.from(JSON.parse(await Bun.file(ctx.flags['gift-abi']).text()))
            // The same encoding vp1deploy's setabi sends, so this matches the abihash row it writes.
            const giftAbiHash = sha256(Serializer.encode({ object: giftAbi, type: ABI }).array)
            return [
                // Aborts the whole exec until vp1deploy sets the gift ABI: before that, gift.vaulta has no code and addcreator would succeed as a no-op, spending this msig.
                Action.from(
                    {
                        account: ASSERT_CONTRACT,
                        name: 'require',
                        authorization: [],
                        data: {
                            chain_params_hash: ctx.flags['chain-params-hash'],
                            manifest_id: GUARD_MANIFEST_ID,
                            actions: [{ contract: CONTRACT, action: 'addcreator' }],
                            abi_hashes: [giftAbiHash],
                        },
                    },
                    assertAbi,
                ),
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
            ]
        },
    },
}
