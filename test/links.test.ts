import { describe, expect, test } from 'bun:test'
import { lintLinks } from '$lib/links'

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
    test('balanced parentheses stay in the destination', () => {
        const errors = lintLinks('See [x](assets/diagram(1).png).', opts)
        expect(errors).toEqual([
            'internal link must be ../vp-NNNN-slug/proposal.md, assets/<file>, or a sibling language file: assets/diagram(1).png',
        ])
    })
    test('nested parentheses to depth three stay in the destination', () => {
        const errors = lintLinks('See [x](assets/a(b(c(d)e)f)g.png).', opts)
        expect(errors).toEqual([
            'internal link must be ../vp-NNNN-slug/proposal.md, assets/<file>, or a sibling language file: assets/a(b(c(d)e)f)g.png',
        ])
    })
    test('nesting beyond depth three is not recognised as a link at all', () => {
        expect(lintLinks('See [x](assets/a(b(c(d(e)f)g)h)i.png).', opts)).toEqual([])
    })
    test('an unbalanced close paren still ends the destination', () => {
        expect(lintLinks('See [chart](assets/chart.png)) trailing.', opts)).toEqual([])
        const errors = lintLinks('See [x](assets/dia)gram.png).', opts)
        expect(errors).toEqual(['relative link does not resolve: assets/dia'])
    })
    test('a parenthesised destination is validated whole rather than truncated', () => {
        const pinned = `https://github.com/greymass/vaulta-proposals/blob/${'a'.repeat(40)}/doc(1).md`
        expect(lintLinks(`See [VPS-1](${pinned}).`, opts)).toEqual([])
    })
    test('a reference definition alone is an error', () => {
        expect(lintLinks('# T\n\n[ref]: ../../README.md\n', opts)).toEqual([
            'link destination must be written inline, not as a reference definition: [ref]',
        ])
    })
    test('the full reference form is an error', () => {
        const body = '# T\n\nSee [the readme][ref].\n\n[ref]: ../../README.md\n'
        expect(lintLinks(body, opts)).toEqual([
            'link destination must be written inline, not as a reference definition: [ref]',
            'link destination must be written inline, not as a reference-style link: [ref]',
        ])
    })
    test('the collapsed reference form is an error and names the text as the label', () => {
        const body = '# T\n\nSee [ref][].\n\n[ref]: ../../README.md\n'
        expect(lintLinks(body, opts)).toEqual([
            'link destination must be written inline, not as a reference definition: [ref]',
            'link destination must be written inline, not as a reference-style link: [ref]',
        ])
    })
    test('the shortcut reference form is an error when a definition matches', () => {
        const body = '# T\n\nSee [Ref] for details.\n\n[ref]: ../../README.md\n'
        expect(lintLinks(body, opts)).toEqual([
            'link destination must be written inline, not as a reference definition: [ref]',
            'link destination must be written inline, not as a reference-style link: [Ref]',
        ])
    })
    test('a bare bracketed span with no matching definition stays clean', () => {
        expect(lintLinks('# T\n\nSee [not a link] here.\n', opts)).toEqual([])
    })
    test('reference syntax inside a code fence stays clean', () => {
        const body = '# T\n\n```\nSee [the readme][ref].\n\n[ref]: ../../README.md\n```\n'
        expect(lintLinks(body, opts)).toEqual([])
    })
    test('a relative reference destination that previously escaped is now caught', () => {
        const body = '# T\n\nSee [the readme][ref].\n\n[ref]: ../../README.md\n'
        expect(lintLinks(body, opts).length).toBe(2)
    })
    test('a link label wrapping across a single newline is still matched and validated', () => {
        const body = '# T\n\nSee [the\ndocs](https://docs.vaulta.com/thing) for details.\n'
        expect(lintLinks(body, opts)).toEqual([
            'external link not on the allowlist (commit-pinned github.com only): https://docs.vaulta.com/thing',
        ])
    })
    test('a wrapped label on a cross-VP link is still checked against the VP number', () => {
        const good =
            'Depends on [VP-0002](../vp-0002-new-network-accounts/proposal.md) for accounts.'
        expect(lintLinks(good, opts)).toEqual([])
        const bad =
            'Depends on [the accounts\nproposal](../vp-0002-new-network-accounts/proposal.md).'
        expect(lintLinks(bad, opts)).toEqual([
            'cross-VP link text must be "VP-0002" (got "the accounts\nproposal")',
        ])
    })
    test('an open bracket and a later link separated by a blank line are not one link', () => {
        const body =
            '# T\n\nAn unmatched bracket [here.\n\nSee [VP-0002](../vp-0002-new-network-accounts/proposal.md).\n'
        expect(lintLinks(body, opts)).toEqual([])
    })
    test('a bare URL in the gap between an open bracket and a later link is reported', () => {
        const body =
            '# T\n\nAn unmatched bracket [here.\n\nA bare URL https://evil.com/x lives in the gap.\n\nSee [chart](assets/chart.png).\n'
        expect(lintLinks(body, opts)).toEqual(['bare URL not on the allowlist: https://evil.com/x'])
    })
    test('a bracketed span and a later parenthetical separated by a blank line are not one link', () => {
        const body = '# T\n\nSee [not a link] here.\n\n(An aside.) https://evil.com/y follows.\n'
        expect(lintLinks(body, opts)).toEqual(['bare URL not on the allowlist: https://evil.com/y'])
    })
    test('an inline link is not reported as a shortcut reference', () => {
        const body = '# T\n\nSee [chart](assets/chart.png).\n\n[chart]: assets/chart.png\n'
        expect(lintLinks(body, opts)).toEqual([
            'link destination must be written inline, not as a reference definition: [chart]',
        ])
    })
})
