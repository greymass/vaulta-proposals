import { describe, expect, test } from 'bun:test'
import { addManifestAction, delManifestAction, manifestId } from '$lib/manifest'
import { GUARD_MANIFEST, GUARD_MANIFEST_ID } from '../proposals/vp-0004-gm-creator/msig/index'

const VP4_MANIFEST_ID = '5bebd48fe9fba89943219a6240d5e9481bc78583a9fd9e3cd72451b53ef73e50'

describe('manifestId', () => {
    test("VP-0004's manifest keeps the id its admission msig requires", () => {
        expect(manifestId(GUARD_MANIFEST)).toBe(VP4_MANIFEST_ID)
        expect(GUARD_MANIFEST_ID).toBe(VP4_MANIFEST_ID)
    })
    test('any field change moves the id', () => {
        expect(manifestId({ ...GUARD_MANIFEST, appmeta: 'VP-0005' })).not.toBe(VP4_MANIFEST_ID)
    })
})

describe('manifest actions', () => {
    test('add.manifest is signed by the manifest account and carries its fields', () => {
        const action = addManifestAction(GUARD_MANIFEST)
        expect(action.name).toBe('add.manifest')
        expect(action.authorization).toEqual([{ actor: 'gm', permission: 'active' }])
        expect(action.data).toEqual({
            account: 'gm',
            domain: 'https://github.com/greymass/vaulta-proposals',
            appmeta: 'VP-0004',
            whitelist: [{ contract: 'gift.vaulta', action: 'addcreator' }],
        })
    })
    test('del.manifest names the manifest by id', () => {
        const action = delManifestAction(GUARD_MANIFEST)
        expect(action.name).toBe('del.manifest')
        expect(action.data).toEqual({ id: VP4_MANIFEST_ID })
    })
})
