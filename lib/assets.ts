import type { Dirent } from 'node:fs'
import { readdirSync } from 'node:fs'
import { join } from 'node:path'

export const ASSET_EXTENSIONS = ['.md', '.txt', '.json', '.csv', '.png', '.jpg', '.webp', '.svg']
export const ASSET_SIZE_LIMIT = 1_048_576
export const ASSET_COUNT_LIMIT = 64

// Namespace-aware and category-complete: SVG is XML, so `<s:script>` is a script, and <style>/SMIL/DOCTYPE
// are execution or fetch vectors a textual regex over local names alone would miss.
const SVG_CHECKS: [RegExp, string][] = [
    [/<(?:[a-z0-9]+:)?script[\s/>]/i, 'contains <script>'],
    [/<(?:[a-z0-9]+:)?foreignObject[\s/>]/i, 'contains <foreignObject>'],
    [
        /<(?:[a-z0-9]+:)?(?:animate|animateTransform|animateMotion|set)[\s/>]/i,
        'contains a SMIL animation element',
    ],
    [/<(?:[a-z0-9]+:)?style[\s/>]/i, 'contains a <style> element'],
    [/[\s/"']on[a-z]+\s*=/i, 'contains an on* event attribute'],
    [/<!DOCTYPE/i, 'contains a DOCTYPE declaration'],
    [/<!ENTITY/i, 'contains an ENTITY declaration'],
    [/javascript:/i, 'contains a javascript: URL'],
    [/@import/i, 'contains a CSS @import'],
    [/url\(\s*["']?\s*(?:https?:|\/\/)/i, 'contains an external CSS url()'],
]

// Browsers strip leading and trailing ASCII whitespace from a URL attribute value, so a value must be
// a pure fragment only after trimming, not as written.
function hasExternalHref(content: string): boolean {
    for (const m of content.matchAll(/(?:xlink:href|href)\s*=\s*(["']?)([^"'>]*)\1/gi)) {
        const value = m[2].trim()
        if (value && !value.startsWith('#')) return true
    }
    return false
}

function looksLikeMarkup(content: string): boolean {
    return (
        /^\s*<(?:\?xml|!doctype|svg|html)\b/i.test(content) ||
        /<(?:[a-z0-9]+:)?script[\s/>]/i.test(content)
    )
}

export function lintAssetFile(name: string, size: number, content?: string): string[] {
    const errors: string[] = []
    const lower = name.toLowerCase()
    const ext = name.slice(name.lastIndexOf('.')).toLowerCase()
    if (!ASSET_EXTENSIONS.includes(ext)) {
        errors.push(`${name}: extension not allowed (allowed: ${ASSET_EXTENSIONS.join(' ')})`)
    }
    if (size > ASSET_SIZE_LIMIT) {
        errors.push(`${name}: exceeds the 1 MB asset size cap (${size} bytes)`)
    }
    if (content !== undefined) {
        const svgDeclared = ext === '.svg'
        const svgDisguised = !svgDeclared && (lower.includes('.svg') || looksLikeMarkup(content))
        if (svgDisguised) {
            errors.push(`${name}: SVG or markup content is only allowed in a file named *.svg`)
        }
        if (svgDeclared || svgDisguised) {
            for (const [pattern, reason] of SVG_CHECKS) {
                if (pattern.test(content)) errors.push(`${name}: unsafe SVG (${reason})`)
            }
            if (hasExternalHref(content)) {
                errors.push(`${name}: unsafe SVG (contains a non-fragment href)`)
            }
        }
    }
    return errors
}

export async function lintAssetsDir(dir: string): Promise<string[]> {
    const errors: string[] = []
    let entries: Dirent[]
    try {
        entries = readdirSync(dir, { withFileTypes: true })
    } catch {
        return [] // no assets directory is fine
    }
    if (entries.length > ASSET_COUNT_LIMIT) {
        errors.push(`assets/: too many files (${entries.length}); the cap is ${ASSET_COUNT_LIMIT}`)
    }
    for (const entry of entries) {
        if (entry.isDirectory()) {
            errors.push(`${entry.name}: subdirectories are not allowed in assets/`)
            continue
        }
        // A symlink reports isDirectory() === false but Bun.file() follows it, so reject anything that is not a plain file.
        if (!entry.isFile()) {
            errors.push(
                `${entry.name}: only regular files are allowed in assets/ (symlinks are rejected)`,
            )
            continue
        }
        const file = Bun.file(join(dir, entry.name))
        const needsContent = entry.name.toLowerCase().includes('.svg')
        let content: string | undefined
        if (needsContent) {
            try {
                content = await file.text()
            } catch {
                errors.push(`${entry.name}: asset could not be read`)
                continue
            }
        }
        errors.push(...lintAssetFile(entry.name, file.size, content))
    }
    return errors
}
