import { describe, expect, test } from 'bun:test'
import { Action } from '@wharfkit/antelope'
import { prependCitation } from '$lib/citation'
import { ZERO_COMMIT } from '$lib/constants'
import { canonicalActionsJson, canonicalJson, hashActions } from '$lib/hash'
import { resolveMsigBuilder } from '$lib/msig'

// The value the effort has checked `vp2create`'s bytes against since VP-0002 went on chain.
const VP2CREATE_HASH = 'a3cc9869ff643d3c9c999c9f0ba54fec1d4190fb98d91713fc0a09b61bb7da4e'

describe('canonicalJson', () => {
    test('sorts keys and indents by one space', () => {
        expect(canonicalJson({ b: 1, a: [2, 3] })).toBe('{\n "a": [\n  2,\n  3\n ],\n "b": 1\n}\n')
    })
    test('renders empty containers the way Python does', () => {
        expect(canonicalJson({ a: [], o: {} })).toBe('{\n "a": [],\n "o": {}\n}\n')
    })
    test('escapes non-ASCII code units', () => {
        expect(canonicalJson('한국어')).toBe('"\\ud55c\\uad6d\\uc5b4"\n')
    })
    test('ends with the newline print adds', () => {
        expect(canonicalJson([]).endsWith('\n')).toBe(true)
    })
})

describe('canonicalActionsJson', () => {
    test('objectifies an action into the hashed shape', () => {
        const action = Action.from({
            account: 'eosio',
            name: 'buyrambytes',
            authorization: [{ actor: 'eosio', permission: 'active' }],
            data: '0000000000ea30550000000000ea305500200000',
        })
        const json = canonicalActionsJson([action])
        expect(json.indexOf('"account"')).toBeLessThan(json.indexOf('"authorization"'))
        expect(json.indexOf('"data"')).toBeLessThan(json.indexOf('"name"'))
        expect(json).toContain('"data": "0000000000ea30550000000000ea305500200000"')
    })
})

describe('hashActions', () => {
    test("VP-0002 vp2create hashes to the effort's recorded value", async () => {
        const { slug, vp, name, builder } = await resolveMsigBuilder('VP-0002', 'vp2create')
        const ctx = { vp, slug, commit: ZERO_COMMIT, flags: {} }
        const actions = prependCitation(name, builder, ctx, await builder.build(ctx))
        expect(hashActions(actions)).toBe(VP2CREATE_HASH)
    })
})
