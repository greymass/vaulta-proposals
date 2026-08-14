import { stripCode } from './markdown'

const GITHUB_COMMIT_PINNED =
    /^https:\/\/github\.com\/[\w.-]+\/[\w.-]+\/(?:blob|tree)\/[0-9a-f]{40}\/\S+$/
const CROSS_VP = /^\.\.\/(vp-(\d{4})-[a-z0-9-]+)\/proposal(?:\.[a-z-]+)?\.md(?:#[\w-]+)?$/
const OWN_ASSET = /^assets\/[\w][\w.-]*$/
const SIBLING = /^proposal(?:\.[a-z-]+)?\.md$/
const SAFE_ANCHOR = /^#[\p{L}\p{N}_-]+$/u
// A title may span lines but not a blank line (CommonMark 0.31.2 §6.3); the paren form forbids nesting.
const TITLE = /"(?:[^"\n]|\n(?!\s*\n))*"|'(?:[^'\n]|\n(?!\s*\n))*'|\((?:[^()\n]|\n(?!\s*\n))*\)/
// A bare destination may carry balanced parentheses (CommonMark 0.31.2 §6.3), unrolled to three levels of nesting.
const DEST_ATOM = '[^()\\s]'
const DEST_PAREN_1 = `\\(${DEST_ATOM}*\\)`
const DEST_PAREN_2 = `\\((?:${DEST_ATOM}|${DEST_PAREN_1})*\\)`
const DEST_PAREN_3 = `\\((?:${DEST_ATOM}|${DEST_PAREN_2})*\\)`
const BARE_DEST = `(?:${DEST_ATOM}|${DEST_PAREN_3})+`
// Link text may span lines but not a blank line (CommonMark 0.31.2 §6.3), same as a title.
const LABEL = '(?:[^\\]\\n]|\\n(?!\\s*\\n))*'
const MD_LINK = new RegExp(
    `\\[(${LABEL})\\]\\(\\s*(?:<([^<>\\n]*)>|(${BARE_DEST}))(?:\\s+(?:${TITLE.source}))?\\s*\\)`,
    'g',
)
// Case-insensitive scheme and www-autolink coverage: GitHub renders HTTP://, HTTPS://, and www. as live links.
const URL = /(?:https?:\/\/|www\.)[^\s)\]>"']+/gi

// A link reference definition (CommonMark 0.31.2 §4.7), allowing the same three leading spaces as a fence.
const REF_DEF = /^ {0,3}\[([^\]\n]+)\]:[ \t]*\S/
const REF_FULL = /\[([^\]\n]*)\]\[([^\]\n]*)\]/g
const REF_SHORTCUT = /\[([^\]\n]+)\]/g
const INLINE_RULE = 'link destination must be written inline, not as a reference'

// Matching labels are case-insensitive and collapse internal whitespace (CommonMark 0.31.2 §4.7).
function normalizeLabel(label: string): string {
    return label.trim().replace(/\s+/g, ' ').toLowerCase()
}

function lintReferenceLinks(text: string): string[] {
    const errors: string[] = []
    const labels = new Set<string>()
    for (const line of text.split('\n')) {
        const def = line.match(REF_DEF)
        if (!def) continue
        labels.add(normalizeLabel(def[1]))
        errors.push(`${INLINE_RULE} definition: [${def[1].trim()}]`)
    }
    for (const match of text.matchAll(REF_FULL)) {
        const label = match[2].trim() === '' ? match[1] : match[2]
        errors.push(`${INLINE_RULE}-style link: [${label.trim()}]`)
    }
    for (const match of text.matchAll(REF_SHORTCUT)) {
        const end = match.index + match[0].length
        // An inline link, either bracket of the full form, and a definition's own label are all reported elsewhere.
        if ('(['.includes(text[end]) || text[end] === ':' || text[match.index - 1] === ']') continue
        if (labels.has(normalizeLabel(match[1]))) {
            errors.push(`${INLINE_RULE}-style link: [${match[1].trim()}]`)
        }
    }
    return errors
}

export function lintLinks(
    body: string,
    opts: { slug: string; fileExists: (relativePath: string) => boolean },
): string[] {
    const errors: string[] = []
    const text = stripCode(body)
    const linkRanges: [number, number][] = []

    for (const match of text.matchAll(MD_LINK)) {
        const [full, label, angleTarget, bareTarget] = match
        const target = angleTarget !== undefined ? angleTarget : bareTarget
        linkRanges.push([match.index, match.index + full.length])
        if (/^https?:/i.test(target)) {
            if (!GITHUB_COMMIT_PINNED.test(target)) {
                errors.push(
                    `external link not on the allowlist (commit-pinned github.com only): ${target}`,
                )
            }
            continue
        }
        const crossVp = target.match(CROSS_VP)
        if (crossVp) {
            const expected = `VP-${crossVp[2]}`
            if (label !== expected) {
                errors.push(`cross-VP link text must be "${expected}" (got "${label}")`)
            }
            if (!opts.fileExists(target.replace(/#.*$/, ''))) {
                errors.push(`cross-VP link does not resolve: ${target}`)
            }
            continue
        }
        if (OWN_ASSET.test(target) || SIBLING.test(target)) {
            if (!opts.fileExists(target)) {
                errors.push(`relative link does not resolve: ${target}`)
            }
            continue
        }
        if (target.startsWith('#')) {
            if (!SAFE_ANCHOR.test(target)) {
                errors.push(`same-page anchor must match ${SAFE_ANCHOR}: ${target}`)
            }
            continue
        }
        errors.push(
            `internal link must be ../vp-NNNN-slug/proposal.md, assets/<file>, or a sibling language file: ${target}`,
        )
    }

    for (const match of text.matchAll(URL)) {
        const url = match[0]
        // A URL whose start offset falls inside a markdown-link span was already validated above.
        const inLink = linkRanges.some(([start, end]) => match.index >= start && match.index < end)
        if (!inLink && !GITHUB_COMMIT_PINNED.test(url)) {
            errors.push(`bare URL not on the allowlist: ${url}`)
        }
    }
    errors.push(...lintReferenceLinks(text))
    return errors
}
