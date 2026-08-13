import { stripCode } from './markdown'

const GITHUB_COMMIT_PINNED =
    /^https:\/\/github\.com\/[\w.-]+\/[\w.-]+\/(?:blob|tree)\/[0-9a-f]{40}\/\S+$/
const CROSS_VP = /^\.\.\/(vp-(\d{4})-[a-z0-9-]+)\/proposal(?:\.[a-z-]+)?\.md(?:#[\w-]+)?$/
const OWN_ASSET = /^assets\/[\w][\w.-]*$/
const SIBLING = /^proposal(?:\.[a-z-]+)?\.md$/
const SAFE_ANCHOR = /^#[\p{L}\p{N}_-]+$/u
// A title may span lines but not a blank line (CommonMark 0.31.2 §6.3); the paren form forbids nesting.
const TITLE = /"(?:[^"\n]|\n(?!\s*\n))*"|'(?:[^'\n]|\n(?!\s*\n))*'|\((?:[^()\n]|\n(?!\s*\n))*\)/
const MD_LINK = new RegExp(
    `\\[([^\\]]*)\\]\\(\\s*(?:<([^<>\\n]*)>|([^)\\s]+))(?:\\s+(?:${TITLE.source}))?\\s*\\)`,
    'g',
)
// Case-insensitive scheme and www-autolink coverage: GitHub renders HTTP://, HTTPS://, and www. as live links.
const URL = /(?:https?:\/\/|www\.)[^\s)\]>"']+/gi

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
    return errors
}
