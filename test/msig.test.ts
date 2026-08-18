import { describe, expect, test } from 'bun:test'
import { Action } from '@wharfkit/antelope'
import {
    compareActions,
    createMsigModuleLoader,
    findMsigBuilder,
    isBoundMsigRef,
    lintMsigBuilders,
} from '$lib/msig'
import type { MsigBuilder, MsigRef } from '$lib/types'

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

describe('isBoundMsigRef', () => {
    const commit = 'a1b2c3d4e5f60718293a4b5c6d7e8f9012345678'
    test('an entry naming a proposer, proposal, and commit is bound', () => {
        const ref: MsigRef = {
            proposer: 'aaroncox',
            proposal: 'vp2create',
            commit,
            status: 'active',
        }
        expect(isBoundMsigRef(ref)).toBe(true)
    })
    test('a planned entry is not bound', () => {
        expect(isBoundMsigRef({ status: 'planned', title: 'Create the account' })).toBe(false)
    })
    test('an entry missing only the proposal name is not bound', () => {
        expect(isBoundMsigRef({ proposer: 'aaroncox', commit, status: 'planned' })).toBe(false)
    })
    test('an entry missing only the commit is not bound', () => {
        const ref: MsigRef = { proposer: 'aaroncox', proposal: 'vp2create', status: 'active' }
        expect(isBoundMsigRef(ref)).toBe(false)
    })
})

function builder(entry: number): MsigBuilder {
    return {
        entry,
        citationAuth: [{ actor: 'eosio', permission: 'active' }],
        build: async () => [],
    }
}

describe('lintMsigBuilders', () => {
    test('builders covering each entry once are accepted', () => {
        expect(lintMsigBuilders({ vp2create: builder(1), vp2deploy: builder(2) }, 2)).toEqual([])
    })

    test('a builder may name an entry no other builder names, leaving entries uncovered', () => {
        expect(lintMsigBuilders({ vp2deploy: builder(2) }, 2)).toEqual([])
    })

    test('a builder naming an entry past the end of the list is reported', () => {
        expect(lintMsigBuilders({ vp2third: builder(3) }, 2)).toEqual([
            'builder vp2third declares entry 3, but the frontmatter msigs list has 2 entries',
        ])
    })

    test('the singular is used when the list holds one entry', () => {
        expect(lintMsigBuilders({ vp2third: builder(3) }, 1)[0]).toContain('has 1 entry')
    })

    test('two builders claiming the same entry are reported', () => {
        expect(lintMsigBuilders({ vp2create: builder(1), vp2again: builder(1) }, 2)).toEqual([
            'builders vp2create, vp2again all declare entry 1; an entry is enacted by at most one builder',
        ])
    })

    test('a zero, fractional or missing entry is reported', () => {
        expect(lintMsigBuilders({ zero: builder(0) }, 2)[0]).toContain('one-based')
        expect(lintMsigBuilders({ half: builder(1.5) }, 2)[0]).toContain('one-based')
        expect(
            lintMsigBuilders({ none: { build: async () => [] } as unknown as MsigBuilder }, 2)[0],
        ).toContain('one-based')
    })
})

describe('findMsigBuilder', () => {
    test('resolves a builder by frontmatter position rather than by on-chain name', () => {
        const builders = { vp2create: builder(1), vp2deploy: builder(2) }
        expect(findMsigBuilder(builders, 2)?.name).toBe('vp2deploy')
    })

    test('an entry no builder declares resolves to nothing', () => {
        expect(findMsigBuilder({ vp2create: builder(1) }, 2)).toBeUndefined()
    })
})

describe('createMsigModuleLoader', () => {
    test('constructing a loader for a proposal with no msig directory does not fail', () => {
        expect(() => createMsigModuleLoader('vp-0001-ram-gifting')).not.toThrow()
    })
    test('asking for a missing module names the file rather than failing to resolve it', async () => {
        const load = createMsigModuleLoader('vp-0001-ram-gifting')
        await expect(load()).rejects.toThrow(
            'proposals/vp-0001-ram-gifting/msig/index.ts does not exist; an entry naming a proposer and proposal name needs builder code that rebuilds its actions',
        )
    })
})
