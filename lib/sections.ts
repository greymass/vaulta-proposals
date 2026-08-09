import { scanLines } from './markdown'

const CORE_FIRST = 'Summary'
const CORE_LAST = ['Open Questions', 'Next Steps'] as const

interface Parsed {
    headings: string[]
    contents: Map<string, string[]>
    errors: string[]
}

export function parseSections(body: string): Parsed {
    const errors: string[] = []
    const headings: string[] = []
    const contents = new Map<string, string[]>()
    let current: string | null = null
    let sawTitle = false
    for (const { line, fenced } of scanLines(body)) {
        if (fenced) {
            if (current) contents.get(current)?.push(line)
            continue
        }
        if (line.startsWith('# ')) {
            if (sawTitle) errors.push('only one # title heading is allowed')
            if (headings.length > 0) errors.push('# title must precede all ## sections')
            sawTitle = true
            continue
        }
        if (line.startsWith('## ')) {
            current = line.slice(3).trim()
            headings.push(current)
            contents.set(current, [])
            continue
        }
        if (current) contents.get(current)?.push(line)
    }
    if (!sawTitle) errors.push('document must start with a # title heading')
    return { headings, contents, errors }
}

export function lintSections(body: string): string[] {
    const { headings, contents, errors } = parseSections(body)
    if (headings[0] !== CORE_FIRST) {
        errors.push(`first ## section must be "${CORE_FIRST}"`)
    }
    const lastTwo = headings.slice(-2)
    if (lastTwo[0] !== CORE_LAST[0] || lastTwo[1] !== CORE_LAST[1]) {
        errors.push(`last two ## sections must be "${CORE_LAST[0]}" then "${CORE_LAST[1]}"`)
    }
    for (const core of [CORE_FIRST, ...CORE_LAST]) {
        const lines = contents.get(core)
        if (lines && !lines.some((line) => line.trim().length > 0)) {
            errors.push(`core section "${core}" must not be empty ("None." is acceptable)`)
        }
    }
    return errors
}

export function lintStructureMirror(englishBody: string, translatedBody: string): string[] {
    const en = parseSections(englishBody).headings
    const tr = parseSections(translatedBody).headings
    if (en.length !== tr.length) {
        return [`translation has ${tr.length} ## sections but the English source has ${en.length}`]
    }
    return []
}
