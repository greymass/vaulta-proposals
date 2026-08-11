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
    test('excerpt is optional', () => {
        const { value, errors } = validateFrontmatter(valid(), SLUG)
        expect(errors).toEqual([])
        expect(value?.excerpt).toBeUndefined()
    })
    test('accepts a string excerpt', () => {
        const { value, errors } = validateFrontmatter(
            { ...valid(), excerpt: 'A short summary.' },
            SLUG,
        )
        expect(errors).toEqual([])
        expect(value?.excerpt).toBe('A short summary.')
    })
    test('rejects a non-string excerpt', () => {
        const { errors } = validateFrontmatter({ ...valid(), excerpt: 42 }, SLUG)
        expect(errors.some((e) => e.includes('excerpt must be a string when present'))).toBe(true)
    })
    test('accepts an excerpt of exactly 280 code points', () => {
        const { errors } = validateFrontmatter({ ...valid(), excerpt: 'a'.repeat(280) }, SLUG)
        expect(errors).toEqual([])
    })
    test('rejects an excerpt of 281 code points', () => {
        const { errors } = validateFrontmatter({ ...valid(), excerpt: 'a'.repeat(281) }, SLUG)
        expect(errors.some((e) => e.includes('280 characters or fewer (got 281)'))).toBe(true)
    })
    test('counts astral characters as one code point each', () => {
        const excerpt = '\u{1F600}'.repeat(280)
        const { errors } = validateFrontmatter({ ...valid(), excerpt }, SLUG)
        expect(errors).toEqual([])
    })
    test('rejects an excerpt containing a newline', () => {
        const { errors } = validateFrontmatter({ ...valid(), excerpt: 'line one\nline two' }, SLUG)
        expect(errors.some((e) => e.includes('excerpt'))).toBe(true)
    })
    test.each(['`code`', 'a [link]', 'array[0]', '{@include}'])(
        'rejects markup marker in %s',
        (excerpt) => {
            const { errors } = validateFrontmatter({ ...valid(), excerpt }, SLUG)
            expect(errors.some((e) => e.includes('excerpt'))).toBe(true)
        },
    )
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
