import { describe, expect, test } from 'bun:test'
import {
    checkDocuments,
    documentStem,
    documentTranslationLang,
    extractFirstHeading,
    validateDocumentTranslationFrontmatter,
} from '$lib/documents'
import { validateFrontmatter } from '$lib/frontmatter'

describe('checkDocuments', () => {
    test('absent field passes', () => {
        const errors: string[] = []
        checkDocuments(undefined, errors)
        expect(errors).toEqual([])
    })
    test('empty list is valid and means single-document', () => {
        const errors: string[] = []
        checkDocuments([], errors)
        expect(errors).toEqual([])
    })
    test('ordered list of documents/<stem>.md paths passes', () => {
        const errors: string[] = []
        checkDocuments(['documents/msig-5.md', 'documents/rfp-framework.md'], errors)
        expect(errors).toEqual([])
    })
    test('non-string entries rejected', () => {
        const errors: string[] = []
        checkDocuments([{ file: 'documents/a.md' }], errors)
        expect(errors).toEqual(['documents must be a list of paths (may be empty)'])
    })
    test('path outside documents/ rejected', () => {
        const errors: string[] = []
        checkDocuments(['exhibits/a.md'], errors)
        expect(errors.length).toBe(1)
    })
    test('subdirectory inside documents/ rejected', () => {
        const errors: string[] = []
        checkDocuments(['documents/sub/a.md'], errors)
        expect(errors.length).toBe(1)
    })
    test('stem with a dot rejected, so a translation file cannot be declared', () => {
        const errors: string[] = []
        checkDocuments(['documents/rfp-framework.ko.md'], errors)
        expect(errors.length).toBe(1)
    })
    test('uppercase stem rejected', () => {
        const errors: string[] = []
        checkDocuments(['documents/RFP.md'], errors)
        expect(errors.length).toBe(1)
    })
    test('duplicate entries rejected', () => {
        const errors: string[] = []
        checkDocuments(['documents/a.md', 'documents/a.md'], errors)
        expect(errors.some((e) => e.includes('duplicates'))).toBe(true)
    })
    test('validateFrontmatter accepts the documents key', () => {
        const { errors } = validateFrontmatter(
            {
                vp: 'VP-0003',
                title: 'T',
                standard: 'VPS-1',
                status: 'Draft',
                authors: ['A'],
                created: '2026-09-01',
                accounts: [],
                msigs: [],
                sentiment: [],
                requires: [],
                documents: ['documents/rfp-framework.md'],
            },
            'vp-0003-rfp-program',
        )
        expect(errors).toEqual([])
    })
})

describe('documentStem', () => {
    test('derives the stem from the declared path', () => {
        expect(documentStem('documents/rfp-framework.md')).toBe('rfp-framework')
    })
})

describe('documentTranslationLang', () => {
    test('matches <stem>.<lang>.md for the stem', () => {
        expect(documentTranslationLang('rfp-framework.ko.md', 'rfp-framework')).toBe('ko')
    })
    test('accepts a region-tagged lang', () => {
        expect(documentTranslationLang('rfp-framework.zh-hant.md', 'rfp-framework')).toBe('zh-hant')
    })
    test('rejects another stem', () => {
        expect(documentTranslationLang('rfp-framework.ko.md', 'msig-5')).toBeNull()
    })
    test('rejects the English document itself', () => {
        expect(documentTranslationLang('rfp-framework.md', 'rfp-framework')).toBeNull()
    })
    test('rejects a non-language tag', () => {
        expect(documentTranslationLang('rfp-framework.draft.md', 'rfp-framework')).toBeNull()
    })
})

describe('validateDocumentTranslationFrontmatter', () => {
    const source = 'a'.repeat(40)
    test('exactly lang and source passes', () => {
        const { value, errors } = validateDocumentTranslationFrontmatter(
            { lang: 'ko', source },
            'ko',
        )
        expect(errors).toEqual([])
        expect(value?.lang).toBe('ko')
    })
    test('unknown keys rejected', () => {
        const { errors } = validateDocumentTranslationFrontmatter(
            { lang: 'ko', source, translator: 'x' },
            'ko',
        )
        expect(errors.some((e) => e.includes('translator'))).toBe(true)
    })
    test('lang must match the filename tag', () => {
        const { errors } = validateDocumentTranslationFrontmatter({ lang: 'zh', source }, 'ko')
        expect(errors.some((e) => e.includes('lang'))).toBe(true)
    })
    test('source must be a 40-hex blob hash', () => {
        const { errors } = validateDocumentTranslationFrontmatter(
            { lang: 'ko', source: 'not-a-hash' },
            'ko',
        )
        expect(errors.some((e) => e.includes('source'))).toBe(true)
    })
    test('non-mapping rejected', () => {
        const { errors } = validateDocumentTranslationFrontmatter(null, 'ko')
        expect(errors).toEqual(['frontmatter is not a mapping'])
    })
})

describe('extractFirstHeading', () => {
    test('returns the first # heading', () => {
        expect(extractFirstHeading('# Vaulta RFP Framework\n\nBody.')).toBe('Vaulta RFP Framework')
    })
    test('finds a heading that is not the first line', () => {
        expect(extractFirstHeading('Status: DRAFT\n\n# Title\n')).toBe('Title')
    })
    test('ignores a # inside a code fence', () => {
        expect(extractFirstHeading('```\n# not a heading\n```\n# Real\n')).toBe('Real')
    })
    test('returns undefined when no # heading exists', () => {
        expect(extractFirstHeading('## Only sections here\n')).toBeUndefined()
    })
    test('ignores an empty # heading', () => {
        expect(extractFirstHeading('# \n# Named\n')).toBe('Named')
    })
})
