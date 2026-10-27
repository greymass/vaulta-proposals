import { describe, expect, test } from 'bun:test'
import { Action } from '@wharfkit/antelope'
import { formatException, proposedTransactionBytes, reportComputed } from '$lib/compute'

describe('formatException', () => {
    test('fills the format from the stack data', () => {
        const message = formatException({
            message: 'Transaction exception',
            stack: [
                {
                    // biome-ignore lint/suspicious/noTemplateCurlyInString: nodeos error formats use ${} placeholders
                    format: "action's authorizing actor '${account}' does not exist",
                    data: { account: 'gift.vaulta' },
                },
            ],
        })
        expect(message).toBe("action's authorizing actor 'gift.vaulta' does not exist")
    })
    test('falls back to the message without a stack', () => {
        expect(formatException({ message: 'Transaction exception' })).toBe('Transaction exception')
    })
})

describe('reportComputed', () => {
    test('an exception means the actions do not execute', () => {
        const report = reportComputed({ except: { message: 'boom' }, action_traces: [] })
        expect(report.executes).toBe(false)
        expect(report.error).toBe('boom')
    })
    test('notifications are left out and ram deltas sum per account', () => {
        const report = reportComputed({
            except: null,
            action_traces: [
                {
                    receiver: 'eosio',
                    act: { account: 'eosio', name: 'newaccount' },
                    account_ram_deltas: [{ account: 'gift.vaulta', delta: 2992 }],
                },
                {
                    receiver: 'eosio.token',
                    act: {
                        account: 'eosio.token',
                        name: 'transfer',
                        data: { from: 'eosio', to: 'eosio.ram', quantity: '1.3865 EOS' },
                    },
                    account_ram_deltas: [{ account: 'gift.vaulta', delta: 8 }],
                },
                {
                    receiver: 'eosio.ram',
                    act: {
                        account: 'eosio.token',
                        name: 'transfer',
                        data: { from: 'eosio', to: 'eosio.ram', quantity: '1.3865 EOS' },
                    },
                },
            ],
        })
        expect(report.executes).toBe(true)
        expect(report.actions).toEqual(['eosio::newaccount', 'eosio.token::transfer'])
        expect(report.ramDeltas).toEqual([['gift.vaulta', 3000]])
        expect(report.transfers).toEqual(['eosio -> eosio.ram 1.3865 EOS (eosio.token)'])
    })
})

describe('proposedTransactionBytes', () => {
    test('counts the header, the action list, and each action', () => {
        const action = Action.from({
            account: 'eosio',
            name: 'buyrambytes',
            authorization: [{ actor: 'eosio', permission: 'active' }],
            data: '0000000000ea30550000000000ea305500200000',
        })
        // 13 header + 3 list counts; 8 + 8 + 1 + 16 authorization; 1 + 20 data.
        expect(proposedTransactionBytes([action])).toBe(70)
    })
})
