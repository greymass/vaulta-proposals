import { Name, PermissionLevel, PrivateKey } from '@wharfkit/antelope'

export { LANG_LABELS, MSIG_STATUSES, REQUIRED_LANGS, STATUSES } from './types'

export const ROOT = new URL('..', import.meta.url).pathname

export const NODEOS_API_URL = process.env.NODEOS_API_URL || 'https://vaulta.greymass.com'

export const SYSTEM_ACCOUNT = Name.from('eosio')

export const NETWORK_AUTHORITY = {
    threshold: 1,
    keys: [],
    accounts: [
        {
            weight: 1,
            permission: {
                actor: 'eosio', // Top 21 BPs
                permission: 'active',
            },
        },
    ],
    waits: [],
}

export function proposerPermission(): PermissionLevel {
    if (!process.env.PROPOSER_PERMISSION) {
        throw new Error('Missing PROPOSER_PERMISSION in environment (required to broadcast)')
    }
    return PermissionLevel.from(process.env.PROPOSER_PERMISSION)
}

export function proposerKey(): PrivateKey {
    if (!process.env.PROPOSER_PRIVATE_KEY) {
        throw new Error('Missing PROPOSER_PRIVATE_KEY in environment (required to broadcast)')
    }
    return PrivateKey.from(process.env.PROPOSER_PRIVATE_KEY)
}
