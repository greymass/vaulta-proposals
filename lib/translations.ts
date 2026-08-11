import { LANG_LABELS } from './constants'
import { checkExcerpt, checkUnknownKeys } from './frontmatter'
import type { TranslationFrontmatter } from './types'

export const TRANSLATION_FILE_PATTERN = /^proposal\.([a-z]{2}(?:-[a-z]+)?)\.md$/
const BLOB_PATTERN = /^[0-9a-f]{40}$/
const ALLOWED_KEYS = new Set(['lang', 'source', 'translator', 'excerpt'])

export function gitBlobHash(content: string): string {
    const bytes = new TextEncoder().encode(content)
    const hasher = new Bun.CryptoHasher('sha1')
    hasher.update(`blob ${bytes.length}\0`)
    hasher.update(bytes)
    return hasher.digest('hex')
}

export function validateTranslationFrontmatter(
    data: unknown,
    filename: string,
): { value?: TranslationFrontmatter; errors: string[] } {
    const errors: string[] = []
    if (typeof data !== 'object' || data === null) {
        return { errors: ['frontmatter is not a mapping'] }
    }
    const fm = data as Record<string, unknown>
    checkUnknownKeys(fm, ALLOWED_KEYS, errors, 'translation frontmatter')
    const tag = filename.match(TRANSLATION_FILE_PATTERN)?.[1]
    if (!tag) {
        errors.push(`filename ${filename} must match proposal.<lang>.md`)
    }
    if (typeof fm.lang !== 'string' || (tag && fm.lang !== tag)) {
        errors.push(`lang must match the filename language tag (${tag})`)
    }
    if (typeof fm.source !== 'string' || !BLOB_PATTERN.test(fm.source)) {
        errors.push('source must be the 40-hex git blob hash of the English source')
    }
    if (fm.translator !== undefined && typeof fm.translator !== 'string') {
        errors.push('translator must be a string when present')
    }
    if (fm.excerpt !== undefined && typeof fm.excerpt !== 'string') {
        errors.push('excerpt must be a string when present')
    } else if (typeof fm.excerpt === 'string') {
        checkExcerpt(fm.excerpt, errors)
    }
    return errors.length ? { errors } : { value: fm as unknown as TranslationFrontmatter, errors }
}

function fileFor(lang: string): string {
    return lang === 'en' ? 'proposal.md' : `proposal.${lang}.md`
}

export function expectedNavLine(langs: string[]): string {
    const ordered = ['en', ...langs.filter((l) => l !== 'en').sort()]
    return ordered.map((lang) => `[${LANG_LABELS[lang] ?? lang}](${fileFor(lang)})`).join(' | ')
}

export function lintNavLine(body: string, langs: string[]): string[] {
    const lines = body.split('\n')
    const titleIndex = lines.findIndex((line) => line.startsWith('# '))
    if (titleIndex === -1) {
        return ['document has no # title heading']
    }
    const next = lines.slice(titleIndex + 1).find((line) => line.trim().length > 0)
    const expected = expectedNavLine(langs)
    if (next?.trim() !== expected) {
        return [`first line after the title must be the language nav: ${expected}`]
    }
    return []
}
