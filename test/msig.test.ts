import { describe, expect, test } from 'bun:test'
import { Action } from '@wharfkit/antelope'
import { compareActions } from '../lib/msig'

function makeAction(data: string): Action {
    return Action.from({
        account: 'eosio',
        name: 'buyrambytes',
        authorization: [{ actor: 'eosio', permission: 'active' }],
        data,
    })
}

describe('compareActions', () => {
    test('identical actions match', () => {
        const hex = '0000000000ea30550000000000ea305500200000'
        expect(compareActions([makeAction(hex)], [makeAction(hex)])).toEqual([])
    })
    test('different data is reported', () => {
        const mismatches = compareActions(
            [makeAction('0000000000ea30550000000000ea305500200000')],
            [makeAction('0000000000ea30550000000000ea305500400000')],
        )
        expect(mismatches.length).toBe(1)
        expect(mismatches[0]).toContain('data')
    })
    test('count mismatch is reported', () => {
        expect(compareActions([], [makeAction('00')])[0]).toContain('action count')
    })
})
