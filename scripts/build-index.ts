import { join } from 'node:path'
import { ROOT } from '$lib/constants'
import { extractFirstHeading } from '$lib/documents'
import { extractCardFields, resolveExcerpt } from '$lib/excerpt'
import { resolveUpdated } from '$lib/frontmatter'
import { lintRepo } from '$lib/repo'
import type { DocumentIndexEntry, IndexEntry } from '$lib/types'

const indexPath = join(ROOT, 'index.json')
const check = process.argv.includes('--check')

async function gitUpdated(slug: string): Promise<string | null> {
    const proc = Bun.spawn(['git', 'log', '-1', '--format=%cs', '--', `proposals/${slug}`], {
        cwd: ROOT,
        stdout: 'pipe',
        stderr: 'ignore',
    })
    const out = (await new Response(proc.stdout).text()).trim()
    await proc.exited
    return out || null
}

const { errors, proposals } = await lintRepo(ROOT)
if (errors.length) {
    console.error('index build failed:')
    for (const error of errors) console.error(`  - ${error}`)
    process.exit(1)
}

const index: IndexEntry[] = await Promise.all(
    proposals.map(async (p) => {
        // revisions is authored data for the detail page, not part of the index shape
        const { revisions, documents: _documents, ...frontmatter } = p.frontmatter
        const documentEntries: DocumentIndexEntry[] = p.documents.map((d) => {
            const heading = extractFirstHeading(d.body)
            return {
                path: `proposals/${p.slug}/${d.file}`,
                ...(heading !== undefined && { heading }),
                translations: d.translations.map((t) => {
                    const theading = extractFirstHeading(t.body)
                    return {
                        lang: t.lang,
                        path: `proposals/${p.slug}/${d.file.slice(0, -'.md'.length)}.${t.lang}.md`,
                        current: t.current,
                        ...(theading !== undefined && { heading: theading }),
                    }
                }),
            }
        })
        return {
            ...frontmatter,
            slug: p.slug,
            path: `proposals/${p.slug}/proposal.md`,
            updated: resolveUpdated(revisions, await gitUpdated(p.slug)),
            excerpt: resolveExcerpt(p.frontmatter.excerpt, p.body),
            translations: p.translations.map((t) => ({
                lang: t.lang,
                path: `proposals/${p.slug}/proposal.${t.lang}.md`,
                current: t.current,
                title: extractCardFields(t.body).title,
                excerpt: resolveExcerpt(t.frontmatter.excerpt, t.body),
                msigs: t.frontmatter.msigs ?? [],
            })),
            ...(documentEntries.length > 0 && { documents: documentEntries }),
        }
    }),
)
index.sort((a, b) => a.vp.localeCompare(b.vp))

const output = `${JSON.stringify({ generated: new Date().toISOString(), proposals: index }, null, 4)}\n`

if (check) {
    const current = await Bun.file(indexPath)
        .text()
        .catch(() => '')
    // compare structurally, ignoring the volatile generated/updated fields
    const normalize = (text: string): unknown => {
        let data: { generated?: string; proposals?: Record<string, unknown>[] }
        try {
            data = JSON.parse(text)
        } catch {
            return null
        }
        delete data.generated
        for (const entry of data.proposals ?? []) delete entry.updated
        return data
    }
    if (!Bun.deepEquals(normalize(current), normalize(output), true)) {
        console.error('index.json is stale; run `bun run index` and include the result')
        process.exit(1)
    }
    console.log('index.json is current')
} else {
    await Bun.write(indexPath, output)
    console.log(`wrote index.json with ${index.length} proposal(s)`)
}
