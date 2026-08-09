import { existsSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { lintAssetsDir } from './assets'
import { REQUIRED_LANGS } from './constants'
import { parseProposal, validateFrontmatter } from './frontmatter'
import { lintLinks } from './links'
import { lintFences, lintRawHtml } from './markdown'
import { lintSections, lintStructureMirror } from './sections'
import {
    gitBlobHash,
    lintNavLine,
    TRANSLATION_FILE_PATTERN,
    validateTranslationFrontmatter,
} from './translations'
import type { ProposalFrontmatter, TranslationFrontmatter } from './types'

const MARKDOWN_SIZE_LIMIT = 262_144

export interface LoadedTranslation {
    lang: string
    frontmatter: TranslationFrontmatter
    body: string
    current: boolean
}

export interface LoadedProposal {
    slug: string
    frontmatter: ProposalFrontmatter
    body: string
    translations: LoadedTranslation[]
}

export function crossChecks(
    proposals: { slug: string; frontmatter: ProposalFrontmatter }[],
): string[] {
    const errors: string[] = []
    const byVp = new Map<string, ProposalFrontmatter>()
    for (const { slug, frontmatter } of proposals) {
        if (byVp.has(frontmatter.vp)) {
            errors.push(`${slug}: duplicate ${frontmatter.vp}`)
        }
        byVp.set(frontmatter.vp, frontmatter)
    }
    for (const { slug, frontmatter } of proposals) {
        for (const field of ['requires', 'replaces', 'superseded-by'] as const) {
            for (const target of frontmatter[field] ?? []) {
                if (!byVp.has(target)) {
                    errors.push(`${slug}: ${field} references unknown ${target}`)
                }
            }
        }
        const pairs = [
            ['replaces', 'superseded-by'],
            ['superseded-by', 'replaces'],
        ] as const
        for (const [field, reciprocal] of pairs) {
            for (const target of frontmatter[field] ?? []) {
                const other = byVp.get(target)
                if (other && !(other[reciprocal] ?? []).includes(frontmatter.vp)) {
                    errors.push(
                        `${slug}: ${field} ${target} but ${target} does not list ${frontmatter.vp} in ${reciprocal}`,
                    )
                }
            }
        }
    }
    return errors
}

export async function lintRepo(
    root: string,
): Promise<{ errors: string[]; proposals: LoadedProposal[] }> {
    const errors: string[] = []
    const proposals: LoadedProposal[] = []
    const proposalsDir = join(root, 'proposals')
    const slugs = readdirSync(proposalsDir, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map((entry) => entry.name)
        .sort()

    for (const slug of slugs) {
        const dir = join(proposalsDir, slug)
        const err = (message: string) => errors.push(`${slug}: ${message}`)
        let markdown: string
        try {
            markdown = await Bun.file(join(dir, 'proposal.md')).text()
        } catch {
            err('missing proposal.md')
            continue
        }
        if (markdown.length > MARKDOWN_SIZE_LIMIT) {
            err(
                `proposal.md exceeds the ${MARKDOWN_SIZE_LIMIT}-byte size cap (${markdown.length} bytes)`,
            )
            continue
        }
        let parsed: { frontmatter: unknown; body: string }
        try {
            parsed = parseProposal(markdown)
        } catch (error) {
            err((error as Error).message)
            continue
        }
        const { value, errors: fmErrors } = validateFrontmatter(parsed.frontmatter, slug)
        if (!value) {
            fmErrors.forEach(err)
            continue
        }
        if (!existsSync(join(root, 'standard', `${value.standard}.md`))) {
            err(`declared standard ${value.standard} does not exist in standard/`)
        }

        const siblings = readdirSync(dir)
            .filter((f) => TRANSLATION_FILE_PATTERN.test(f))
            .sort()
        const langs = ['en', ...siblings.map((f) => f.match(TRANSLATION_FILE_PATTERN)?.[1] ?? '')]
        const fileExists = (rel: string) => existsSync(join(dir, rel))

        lintFences(parsed.body).forEach(err)
        lintRawHtml(parsed.body).forEach(err)
        lintSections(parsed.body).forEach(err)
        lintNavLine(parsed.body, langs).forEach(err)
        lintLinks(parsed.body, { slug, fileExists }).forEach(err)
        for (const assetErr of await lintAssetsDir(join(dir, 'assets'))) err(assetErr)

        const englishHash = gitBlobHash(markdown)
        const translations: LoadedTranslation[] = []
        for (const file of siblings) {
            const terr = (message: string) => errors.push(`${slug}/${file}: ${message}`)
            const text = await Bun.file(join(dir, file)).text()
            let tparsed: { frontmatter: unknown; body: string }
            try {
                tparsed = parseProposal(text)
            } catch (error) {
                terr((error as Error).message)
                continue
            }
            const { value: tfm, errors: terrs } = validateTranslationFrontmatter(
                tparsed.frontmatter,
                file,
            )
            if (!tfm) {
                terrs.forEach(terr)
                continue
            }
            const current = tfm.source === englishHash
            const required = (REQUIRED_LANGS as readonly string[]).includes(tfm.lang)
            if (!current && required) {
                terr('translation is stale: source hash does not match the English blob')
            } else if (!current) {
                console.warn(`warning: ${slug}/${file} is outdated (optional language)`)
            }
            lintFences(tparsed.body).forEach(terr)
            lintRawHtml(tparsed.body).forEach(terr)
            lintNavLine(tparsed.body, langs).forEach(terr)
            lintStructureMirror(parsed.body, tparsed.body).forEach(terr)
            lintLinks(tparsed.body, { slug, fileExists }).forEach(terr)
            translations.push({ lang: tfm.lang, frontmatter: tfm, body: tparsed.body, current })
        }
        for (const lang of REQUIRED_LANGS) {
            if (!translations.some((t) => t.lang === lang)) {
                err(`missing required translation proposal.${lang}.md`)
            }
        }
        proposals.push({ slug, frontmatter: value, body: parsed.body, translations })
    }

    errors.push(...crossChecks(proposals))
    return { errors, proposals }
}
