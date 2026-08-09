import { describe, expect, test } from 'bun:test'
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
