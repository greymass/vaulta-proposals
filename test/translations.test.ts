import { describe, expect, test } from 'bun:test'
import { validateFrontmatter } from '../lib/frontmatter'
import {
    expectedNavLine,
    gitBlobHash,
    lintNavLine,
    validateTranslationFrontmatter,
} from '../lib/translations'

describe('gitBlobHash', () => {
    test('matches git hash-object', () => {
        // printf 'hello\n' | git hash-object --stdin
        expect(gitBlobHash('hello\n')).toBe('ce013625030ba8dba906f756967f9e9ca394464a')
    })
})

describe('validateTranslationFrontmatter', () => {
    const valid = { lang: 'ko', source: 'a'.repeat(40) }
    test('accepts minimal frontmatter', () => {
        expect(validateTranslationFrontmatter(valid, 'proposal.ko.md').errors).toEqual([])
    })
    test('lang must match filename tag', () => {
        const { errors } = validateTranslationFrontmatter(valid, 'proposal.zh.md')
        expect(errors.some((e) => e.includes('lang'))).toBe(true)
    })
    test('source must be 40-hex', () => {
        const { errors } = validateTranslationFrontmatter(
            { lang: 'ko', source: 'nope' },
            'proposal.ko.md',
        )
        expect(errors.some((e) => e.includes('source'))).toBe(true)
    })
    test('unknown keys rejected', () => {
        const { errors } = validateTranslationFrontmatter(
            { ...valid, status: 'Draft' },
            'proposal.ko.md',
        )
        expect(errors.some((e) => e.includes('unknown key'))).toBe(true)
    })
    test('excerpt is optional', () => {
        const { value, errors } = validateTranslationFrontmatter(valid, 'proposal.ko.md')
        expect(errors).toEqual([])
        expect(value?.excerpt).toBeUndefined()
    })
    test('accepts a string excerpt', () => {
        const { value, errors } = validateTranslationFrontmatter(
            { ...valid, excerpt: 'A short summary.' },
            'proposal.ko.md',
        )
        expect(errors).toEqual([])
        expect(value?.excerpt).toBe('A short summary.')
    })
    test('rejects a non-string excerpt', () => {
        const { errors } = validateTranslationFrontmatter(
            { ...valid, excerpt: 42 },
            'proposal.ko.md',
        )
        expect(errors.some((e) => e.includes('excerpt must be a string when present'))).toBe(true)
    })
    test('accepts an excerpt of exactly 280 code points', () => {
        const { errors } = validateTranslationFrontmatter(
            { ...valid, excerpt: 'a'.repeat(280) },
            'proposal.ko.md',
        )
        expect(errors).toEqual([])
    })
    test('rejects an excerpt of 281 code points', () => {
        const { errors } = validateTranslationFrontmatter(
            { ...valid, excerpt: 'a'.repeat(281) },
            'proposal.ko.md',
        )
        expect(errors.some((e) => e.includes('280 characters or fewer (got 281)'))).toBe(true)
    })
    test('counts astral characters as one code point each', () => {
        const excerpt = '\u{1F600}'.repeat(280)
        const { errors } = validateTranslationFrontmatter({ ...valid, excerpt }, 'proposal.ko.md')
        expect(errors).toEqual([])
    })
    test('rejects an excerpt containing a newline', () => {
        const { errors } = validateTranslationFrontmatter(
            { ...valid, excerpt: 'line one\nline two' },
            'proposal.ko.md',
        )
        expect(errors.some((e) => e.includes('excerpt'))).toBe(true)
    })
    test.each(['`code`', 'a [link]', 'array[0]', '{@include}'])(
        'rejects markup marker in %s',
        (excerpt) => {
            const { errors } = validateTranslationFrontmatter(
                { ...valid, excerpt },
                'proposal.ko.md',
            )
            expect(errors.some((e) => e.includes('excerpt'))).toBe(true)
        },
    )
    test('translation may carry an excerpt when the English proposal does not', () => {
        const { errors } = validateFrontmatter(
            {
                vp: 'VP-0001',
                title: 'Test Proposal',
                standard: 'VPS-1',
                status: 'Draft',
                authors: ['Aaron Cox (Greymass)'],
                created: '2026-08-01',
                accounts: [],
                msigs: [],
                sentiment: [],
                requires: [],
            },
            'vp-0001-test-proposal',
        )
        expect(errors).toEqual([])
        const translation = validateTranslationFrontmatter(
            { ...valid, excerpt: 'A short summary.' },
            'proposal.ko.md',
        )
        expect(translation.errors).toEqual([])
        expect(translation.value?.excerpt).toBe('A short summary.')
    })
})

describe('nav line', () => {
    test('expected format', () => {
        expect(expectedNavLine(['en', 'ko', 'zh'])).toBe(
            '[English](proposal.md) | [한국어](proposal.ko.md) | [中文](proposal.zh.md)',
        )
    })
    test('lint passes when line follows the title', () => {
        const body =
            '# 제목\n\n[English](proposal.md) | [한국어](proposal.ko.md) | [中文](proposal.zh.md)\n\n## Summary\n'
        expect(lintNavLine(body, ['en', 'ko', 'zh'])).toEqual([])
    })
    test('lint fails when missing', () => {
        const body = '# Title\n\n## Summary\n'
        expect(lintNavLine(body, ['en', 'ko', 'zh']).length).toBeGreaterThan(0)
    })
})
