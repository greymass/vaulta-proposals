import { describe, expect, test } from 'bun:test'
import { validateFrontmatter } from '../lib/frontmatter'

const valid = () => ({
    vp: 'VP-0001',
    title: 'Test Proposal',
    standard: 'VPS-1',
    status: 'Draft',
    authors: ['Aaron Cox (Greymass)'],
    created: '2026-08-01',
    accounts: ['ram.vaulta'],
    msigs: [{ proposer: 'greymassfuel', proposal: 'giftram', status: 'active' }],
    sentiment: [{ contract: 'sentiment.gm', topic: 'ramgifting' }],
    requires: [],
})

const SLUG = 'vp-0001-test-proposal'

describe('validateFrontmatter v2', () => {
    test('accepts a valid draft', () => {
        const { value, errors } = validateFrontmatter(valid(), SLUG)
        expect(errors).toEqual([])
        expect(value?.standard).toBe('VPS-1')
    })
    test('rejects unknown keys', () => {
        const { errors } = validateFrontmatter({ ...valid(), updated: '2026-08-01' }, SLUG)
        expect(errors.some((e) => e.includes('unknown key "updated"'))).toBe(true)
    })
    test('requires standard field', () => {
        const fm: Record<string, unknown> = valid()
        delete fm.standard
        const { errors } = validateFrontmatter(fm, SLUG)
        expect(errors.some((e) => e.includes('standard'))).toBe(true)
    })
    test('accepts Superseded status with superseded-by', () => {
        const fm = { ...valid(), status: 'Superseded', 'superseded-by': ['VP-0002'] }
        expect(validateFrontmatter(fm, SLUG).errors).toEqual([])
    })
    test('rejects Superseded without superseded-by', () => {
        const { errors } = validateFrontmatter({ ...valid(), status: 'Superseded' }, SLUG)
        expect(errors.some((e) => e.includes('superseded-by'))).toBe(true)
    })
    test('rejects superseded-by when not Superseded', () => {
        const fm = { ...valid(), 'superseded-by': ['VP-0002'] }
        expect(validateFrontmatter(fm, SLUG).errors.length).toBeGreaterThan(0)
    })
    test('msig txid required exactly when executed', () => {
        const executed = {
            ...valid(),
            msigs: [{ proposer: 'greymassfuel', proposal: 'giftram', status: 'executed' }],
        }
        expect(validateFrontmatter(executed, SLUG).errors.some((e) => e.includes('txid'))).toBe(
            true,
        )
        const active = {
            ...valid(),
            msigs: [
                {
                    proposer: 'greymassfuel',
                    proposal: 'giftram',
                    status: 'active',
                    txid: 'a'.repeat(64),
                },
            ],
        }
        expect(validateFrontmatter(active, SLUG).errors.some((e) => e.includes('txid'))).toBe(true)
    })
    test('sentiment entries are name pairs, not numbers', () => {
        const { errors } = validateFrontmatter({ ...valid(), sentiment: [1] }, SLUG)
        expect(errors.some((e) => e.includes('sentiment'))).toBe(true)
    })
    test('rejects invalid antelope names', () => {
        const { errors } = validateFrontmatter({ ...valid(), accounts: ['UPPER'] }, SLUG)
        expect(errors.some((e) => e.includes('accounts'))).toBe(true)
    })
    test('resolution required iff Executed and must match executed msig txid', () => {
        const txid = 'b'.repeat(64)
        const base = {
            ...valid(),
            status: 'Executed',
            msigs: [{ proposer: 'greymassfuel', proposal: 'giftram', status: 'executed', txid }],
        }
        expect(validateFrontmatter(base, SLUG).errors.some((e) => e.includes('resolution'))).toBe(
            true,
        )
        expect(validateFrontmatter({ ...base, resolution: txid }, SLUG).errors).toEqual([])
        expect(
            validateFrontmatter({ ...base, resolution: 'c'.repeat(64) }, SLUG).errors.length,
        ).toBeGreaterThan(0)
        expect(
            validateFrontmatter({ ...valid(), resolution: txid }, SLUG).errors.length,
        ).toBeGreaterThan(0) // forbidden when not Executed
    })
})
