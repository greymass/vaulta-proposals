import { describe, expect, test } from 'bun:test'
import { Action, Bytes, Serializer } from '@wharfkit/antelope'
import { citationAction } from '$lib/citation'
import { abi as eosioAbi } from '$lib/codegen/eosio'
import { ZERO_COMMIT } from '$lib/constants'
import { summarizeActions } from '$lib/summary'

describe('summarizeActions', () => {
    test('numbers actions from one and names account, action and authorizations', () => {
        const action = Action.from({
            account: 'eosio',
            name: 'buyrambytes',
            authorization: [
                { actor: 'eosio', permission: 'active' },
                { actor: 'new.vaulta', permission: 'owner' },
            ],
            data: '0000000000ea30550080c9519b0db89a00400600',
        })
        const [line] = summarizeActions([action])
        expect(line.startsWith('1. eosio::buyrambytes  eosio@active, new.vaulta@owner\n')).toBe(
            true,
        )
    })

    test('decodes an eosio action from the checked-in ABI', () => {
        const action = Action.from({
            account: 'eosio',
            name: 'buyrambytes',
            authorization: [{ actor: 'eosio', permission: 'active' }],
            data: '0000000000ea30550080c9519b0db89a00400600',
        })
        const [line] = summarizeActions([action])
        expect(line).toContain('"receiver": "new.vaulta"')
        expect(line).toContain('"bytes": 409600')
    })

    test('shows the citation memo in full', () => {
        const ref = { vp: 'VP-0002', slug: 'vp-0002-account-creation', commit: ZERO_COMMIT }
        const [line] = summarizeActions([
            citationAction(ref, [{ actor: 'eosio', permission: 'active' }]),
        ])
        expect(line).toContain(
            `VP-0002 https://github.com/greymass/vaulta-proposals/blob/${ZERO_COMMIT}/proposals/vp-0002-account-creation/proposal.md`,
        )
    })

    test('elides a decoded hex field longer than 128 characters, carrying its sha256', () => {
        // `shasum -a 256` over the same 100 bytes, so the expectation is not the implementation restated.
        const bytes = Uint8Array.from({ length: 100 }, (_, i) => i % 251)
        const digest = 'bce0aff19cf5aa6a7469a30d61d04e4376e4bbf6381052ee9e7f33925c954d52'
        const action = Action.from({
            account: 'eosio',
            name: 'setabi',
            authorization: [{ actor: 'new.vaulta', permission: 'active' }],
            data: Serializer.encode({
                object: { account: 'new.vaulta', abi: Bytes.from(bytes) },
                abi: eosioAbi,
                type: 'setabi',
            }),
        })
        const [line] = summarizeActions([action])
        expect(line).toContain(`"abi": "<100 bytes, sha256 ${digest}>"`)
        expect(line).toContain('"account": "new.vaulta"')
    })

    test('never truncates the elided hash', () => {
        const bytes = Uint8Array.from({ length: 100 }, (_, i) => i % 251)
        const action = Action.from({
            account: 'eosio',
            name: 'setabi',
            authorization: [{ actor: 'new.vaulta', permission: 'active' }],
            data: Serializer.encode({
                object: { account: 'new.vaulta', abi: Bytes.from(bytes) },
                abi: eosioAbi,
                type: 'setabi',
            }),
        })
        const [line] = summarizeActions([action])
        const digest = /sha256 ([0-9a-f]+)/.exec(line)?.[1]
        expect(digest?.length).toBe(64)
    })

    test('keeps a short hex field intact', () => {
        const action = Action.from({
            account: 'eosio',
            name: 'setabi',
            authorization: [{ actor: 'new.vaulta', permission: 'active' }],
            data: Serializer.encode({
                object: { account: 'new.vaulta', abi: Bytes.from('aabbcc', 'hex') },
                abi: eosioAbi,
                type: 'setabi',
            }),
        })
        const [line] = summarizeActions([action])
        expect(line).toContain('"abi": "aabbcc"')
    })

    test('falls back to a byte count for an account with no checked-in ABI', () => {
        const action = Action.from({
            account: 'new.vaulta',
            name: 'create',
            authorization: [{ actor: 'eosio', permission: 'active' }],
            data: '0000000000ea30550080c9519b0db89a00400600',
        })
        const [line] = summarizeActions([action])
        expect(line).toContain('<20 bytes>')
    })

    test('falls back to a byte count when the ABI has no such action', () => {
        const action = Action.from({
            account: 'eosio',
            name: 'notanaction',
            authorization: [{ actor: 'eosio', permission: 'active' }],
            data: 'aabbcc',
        })
        const [line] = summarizeActions([action])
        expect(line).toContain('<3 bytes>')
    })
})
