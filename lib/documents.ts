import { checkUnknownKeys } from './frontmatter'
import { scanLines } from './markdown'
import type { DocumentTranslationFrontmatter } from './types'

export const DOCUMENT_PATH_PATTERN = /^documents\/[a-z0-9-]+\.md$/
const BLOB_PATTERN = /^[0-9a-f]{40}$/
const LANG_TAG = /^[a-z]{2}(?:-[a-z]+)?$/
const ALLOWED_KEYS = new Set(['lang', 'source'])

export function checkDocuments(value: unknown, errors: string[]): void {
    if (value === undefined) {
        return
    }
    if (!Array.isArray(value) || !value.every((entry) => typeof entry === 'string')) {
        errors.push('documents must be a list of paths (may be empty)')
        return
    }
    const seen = new Set<string>()
    value.forEach((path, i) => {
        if (!DOCUMENT_PATH_PATTERN.test(path)) {
            errors.push(
                `documents[${i}] must match documents/<stem>.md with a [a-z0-9-]+ stem (got ${JSON.stringify(path)})`,
            )
        }
        if (seen.has(path)) {
            errors.push(`documents[${i}] duplicates ${path}`)
        }
        seen.add(path)
    })
}

export function documentStem(path: string): string {
    return path.slice('documents/'.length, -'.md'.length)
}

export function documentTranslationLang(filename: string, stem: string): string | null {
    if (!filename.startsWith(`${stem}.`) || !filename.endsWith('.md')) return null
    const tag = filename.slice(stem.length + 1, -'.md'.length)
    return LANG_TAG.test(tag) ? tag : null
}

export function validateDocumentTranslationFrontmatter(
    data: unknown,
    lang: string,
): { value?: DocumentTranslationFrontmatter; errors: string[] } {
    const errors: string[] = []
    if (typeof data !== 'object' || data === null) {
        return { errors: ['frontmatter is not a mapping'] }
    }
    const fm = data as Record<string, unknown>
    checkUnknownKeys(fm, ALLOWED_KEYS, errors, 'document translation frontmatter')
    if (fm.lang !== lang) {
        errors.push(`lang must match the filename language tag (${lang})`)
    }
    if (typeof fm.source !== 'string' || !BLOB_PATTERN.test(fm.source)) {
        errors.push('source must be the 40-hex git blob hash of the English document')
    }
    return errors.length
        ? { errors }
        : { value: fm as unknown as DocumentTranslationFrontmatter, errors }
}

export function extractFirstHeading(body: string): string | undefined {
    for (const { line, marker, fenced } of scanLines(body)) {
        if (marker || fenced) continue
        if (line.startsWith('# ')) {
            const heading = line.slice(2).trim()
            if (heading) return heading
        }
    }
    return undefined
}
