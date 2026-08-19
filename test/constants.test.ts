import { describe, expect, test } from 'bun:test'
import { Authority, Serializer } from '@wharfkit/antelope'
import { NETWORK_AUTHORITY, networkContractActiveAuthority } from '$lib/constants'

const ACCOUNT = 'new.vaulta'

function hex(authority: Authority): string {
    return String(Serializer.encode({ object: authority, type: Authority }))
}

describe('NETWORK_AUTHORITY', () => {
    test('is the top 21 producers alone, with no eosio.code an owner could inherit', () => {
        expect(NETWORK_AUTHORITY.accounts.map((entry) => String(entry.permission))).toEqual([
            'eosio.prods@active',
        ])
        expect(Number(NETWORK_AUTHORITY.threshold)).toBe(1)
    })
})

describe('networkContractActiveAuthority', () => {
    test('adds the account own eosio.code to the network authority', () => {
        const authority = networkContractActiveAuthority(ACCOUNT)
        expect(authority.accounts.map((entry) => String(entry.permission))).toEqual([
            'eosio.prods@active',
            'new.vaulta@eosio.code',
        ])
        expect(authority.accounts.map((entry) => Number(entry.weight))).toEqual([1, 1])
        expect(Number(authority.threshold)).toBe(1)
    })

    test('a reversed accounts list serializes identically, so the sorting is not ours to do', () => {
        const sorted = networkContractActiveAuthority(ACCOUNT)
        const reversed = Authority.from({
            threshold: 1,
            keys: [],
            accounts: [...sorted.accounts].reverse(),
            waits: [],
        })
        expect(hex(reversed)).toBe(hex(sorted))
    })
})
