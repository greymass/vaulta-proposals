import { describe, expect, test } from 'bun:test'
import { lintLinks } from '../lib/links'

const opts = {
    slug: 'vp-0001-ram-gifting',
    fileExists: (p: string) =>
        [
            'assets/chart.png',
            'proposal.md',
            'proposal.ko.md',
            'proposal.zh.md',
            '../vp-0002-new-network-accounts/proposal.md',
        ].includes(p),
}

describe('lintLinks', () => {
    test('commit-pinned github link passes', () => {
        const body = `See [VPS-1](https://github.com/greymass/vaulta-proposals/blob/${'a'.repeat(40)}/standard/VPS-1.md).`
        expect(lintLinks(body, opts)).toEqual([])
    })
    test('branch-pinned github link fails', () => {
        const body = 'See [x](https://github.com/greymass/vaulta-proposals/blob/master/README.md).'
        expect(lintLinks(body, opts).length).toBeGreaterThan(0)
    })
    test('other origins fail even bare', () => {
        expect(lintLinks('See https://docs.vaulta.com/thing.', opts).length).toBeGreaterThan(0)
    })
    test('cross-VP link with VP number text passes', () => {
        const body = 'Depends on [VP-0002](../vp-0002-new-network-accounts/proposal.md).'
        expect(lintLinks(body, opts)).toEqual([])
    })
    test('cross-VP link with wrong text fails', () => {
        const body =
            'Depends on [the accounts proposal](../vp-0002-new-network-accounts/proposal.md).'
        expect(lintLinks(body, opts).length).toBeGreaterThan(0)
    })
    test('asset link passes, arbitrary relative path fails', () => {
        expect(lintLinks('See [chart](assets/chart.png).', opts)).toEqual([])
        expect(lintLinks('See [readme](../../README.md).', opts).length).toBeGreaterThan(0)
    })
    test('unresolvable asset fails', () => {
        expect(lintLinks('See [x](assets/missing.png).', opts).length).toBeGreaterThan(0)
    })
    test('urls inside code fences are ignored', () => {
        const body = '```\nhttps://example.com\n```\n'
        expect(lintLinks(body, opts)).toEqual([])
    })
    test('bare URL sharing a prefix with a pinned link still fails', () => {
        const pinned = `https://github.com/evilorg/evilrepo/blob/${'a'.repeat(40)}/x.md`
        const body = `See [x](${pinned}) and also https://github.com/evilorg/evilrepo`
        expect(lintLinks(body, opts).length).toBeGreaterThan(0)
    })
    test('uppercase scheme is not an escape', () => {
        expect(lintLinks('# T\n\nHTTPS://evil.com/x here.', opts).length).toBeGreaterThan(0)
    })
    test('www-prefixed autolink fails', () => {
        expect(lintLinks('# T\n\nGo to www.evil.com now.', opts).length).toBeGreaterThan(0)
    })
    test('same-page anchor link passes', () => {
        expect(lintLinks('See [Mechanics](#mechanics).', opts)).toEqual([])
    })
    test('empty anchor fails', () => {
        expect(lintLinks('See [x](#).', opts).length).toBeGreaterThan(0)
    })
    test('a target containing a space is not recognised as a link at all', () => {
        expect(lintLinks('See [x](#foo bar).', opts)).toEqual([])
    })
    test('anchor with slash fails', () => {
        expect(lintLinks('See [x](#foo/bar).', opts).length).toBeGreaterThan(0)
    })
    test('titled commit-pinned github link passes', () => {
        const body = `See [VPS-1](https://github.com/greymass/vaulta-proposals/blob/${'a'.repeat(40)}/standard/VPS-1.md "the standard").`
        expect(lintLinks(body, opts)).toEqual([])
    })
    test('titled non-allowlisted external fails with exactly one external-link error', () => {
        const errors = lintLinks('See [docs](https://docs.vaulta.com/thing "the docs").', opts)
        expect(errors).toEqual([
            'external link not on the allowlist (commit-pinned github.com only): https://docs.vaulta.com/thing',
        ])
    })
    test('titled relative asset that resolves passes', () => {
        expect(lintLinks('See [chart](assets/chart.png "T").', opts)).toEqual([])
    })
    test('titled relative asset that does not resolve fails', () => {
        const errors = lintLinks('See [x](assets/missing.png "T").', opts)
        expect(errors).toEqual(['relative link does not resolve: assets/missing.png'])
    })
    test('angle-bracket destination with no spaces, resolving, passes', () => {
        expect(lintLinks('See [chart](<assets/chart.png>).', opts)).toEqual([])
    })
    test('angle-bracket destination containing a space fails as an internal link', () => {
        const errors = lintLinks('See [x](<assets/my file.png>).', opts)
        expect(errors).toEqual([
            'internal link must be ../vp-NNNN-slug/proposal.md, assets/<file>, or a sibling language file: assets/my file.png',
        ])
    })
    test('titled angle-bracket destination validated the same way', () => {
        expect(lintLinks('See [chart](<assets/chart.png> "T").', opts)).toEqual([])
        const errors = lintLinks('See [x](<assets/missing.png> "T").', opts)
        expect(errors).toEqual(['relative link does not resolve: assets/missing.png'])
    })
    test('bare-URL scan does not double-report a URL inside a titled link', () => {
        const errors = lintLinks(
            'See [x](https://docs.vaulta.com/thing "title") for details.',
            opts,
        )
        expect(errors.length).toBe(1)
    })
    test('single-quoted title recognised', () => {
        expect(lintLinks("See [chart](assets/chart.png 'T').", opts)).toEqual([])
    })
    test('parenthesised title recognised', () => {
        expect(lintLinks('See [chart](assets/chart.png (T)).', opts)).toEqual([])
    })
    test('cross-VP link with a title still enforces the VP-NNNN link-text rule', () => {
        const body =
            'Depends on [VP-0002](../vp-0002-new-network-accounts/proposal.md "the accounts VP").'
        expect(lintLinks(body, opts)).toEqual([])
        const bad =
            'Depends on [the accounts proposal](../vp-0002-new-network-accounts/proposal.md "the accounts VP").'
        expect(lintLinks(bad, opts).length).toBeGreaterThan(0)
    })
    test('a title containing a blank line is not treated as a link', () => {
        const body = 'See [x](assets/missing.png "line one\n\nline two").'
        expect(lintLinks(body, opts)).toEqual([])
    })
})
