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
})
