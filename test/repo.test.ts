import { describe, expect, test } from 'bun:test'
import { crossChecks } from '$lib/repo'
import type { ProposalFrontmatter } from '$lib/types'

function fm(vp: string, extra: Partial<ProposalFrontmatter> = {}): ProposalFrontmatter {
    return {
        vp,
        title: vp,
        standard: 'VPS-1',
        status: 'Draft',
        authors: ['A'],
        created: '2026-08-01',
        accounts: [],
        msigs: [],
        sentiment: [],
        requires: [],
        ...extra,
    }
}

describe('crossChecks', () => {
    test('requires must resolve', () => {
        const errors = crossChecks([
            { slug: 'vp-0001-a', frontmatter: fm('VP-0001', { requires: ['VP-0009'] }) },
        ])
        expect(errors.some((e) => e.includes('VP-0009'))).toBe(true)
    })
    test('reciprocity enforced both ways', () => {
        const a = { slug: 'vp-0001-a', frontmatter: fm('VP-0001', { replaces: ['VP-0002'] }) }
        const b = { slug: 'vp-0002-b', frontmatter: fm('VP-0002') }
        expect(crossChecks([a, b]).some((e) => e.includes('superseded-by'))).toBe(true)
        const bOk = {
            slug: 'vp-0002-b',
            frontmatter: fm('VP-0002', { status: 'Superseded', 'superseded-by': ['VP-0001'] }),
        }
        expect(crossChecks([a, bOk])).toEqual([])
    })
    test('duplicate vp rejected', () => {
        const errors = crossChecks([
            { slug: 'vp-0001-a', frontmatter: fm('VP-0001') },
            { slug: 'vp-0001-b', frontmatter: fm('VP-0001') },
        ])
        expect(errors.some((e) => e.includes('duplicate'))).toBe(true)
    })
})
