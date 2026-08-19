import { Authority, Name, type NameType, PermissionLevel, PrivateKey } from '@wharfkit/antelope'

export { LANG_LABELS, MSIG_STATUSES, REQUIRED_LANGS, STATUSES } from './types'

export const ROOT = new URL('..', import.meta.url).pathname

export const NODEOS_API_URL = process.env.NODEOS_API_URL || 'https://vaulta.greymass.com'

export const SYSTEM_ACCOUNT = Name.from('eosio')

// Deeper than the 21 in eosio.prods; approve rejects an approver that was not requested up front.
export const REQUESTED_PRODUCER_COUNT = 30

export const PROPOSAL_LIFETIME_DAYS = 180

// Org and repository of the canonical proposal repository, as it appears in VPS-1 citations.
export const PROPOSAL_REPO = 'greymass/vaulta-proposals'

// Stands in for the cited commit during a dry run; a broadcast refuses it.
export const ZERO_COMMIT = '0'.repeat(40)

export const NETWORK_AUTHORITY = Authority.from({
    threshold: 1,
    keys: [],
    accounts: [
        {
            weight: 1,
            permission: {
                actor: 'eosio.prods', // Top 21 BPs
                permission: 'active',
            },
        },
    ],
    waits: [],
})

// `owner` takes NETWORK_AUTHORITY unchanged and never carries eosio.code, which would let a contract's own code drive its highest authority.
export function networkContractActiveAuthority(account: NameType): Authority {
    return Authority.from({
        threshold: 1,
        keys: [],
        accounts: [
            ...NETWORK_AUTHORITY.accounts,
            { weight: 1, permission: { actor: account, permission: 'eosio.code' } },
        ],
        waits: [],
    })
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
