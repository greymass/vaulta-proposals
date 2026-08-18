import { describe, expect, test } from 'bun:test'
import { lintAssetFile } from '$lib/assets'

describe('lintAssetFile', () => {
    test('allowlisted extension passes', () => {
        expect(lintAssetFile('chart.png', 1000)).toEqual([])
    })
    test('pdf banned', () => {
        expect(lintAssetFile('doc.pdf', 1000).length).toBeGreaterThan(0)
    })
    test('size cap enforced', () => {
        expect(lintAssetFile('big.png', 2_000_000).length).toBeGreaterThan(0)
    })
    test('svg with script rejected', () => {
        expect(lintAssetFile('x.svg', 100, '<svg><script>1</script></svg>').length).toBeGreaterThan(
            0,
        )
    })
    test('svg with event handler rejected', () => {
        expect(lintAssetFile('x.svg', 100, '<svg onload="x()"></svg>').length).toBeGreaterThan(0)
    })
    test('svg with external href rejected', () => {
        expect(
            lintAssetFile('x.svg', 100, '<svg><use href="https://x.com/a#b"/></svg>').length,
        ).toBeGreaterThan(0)
    })
    test('clean svg passes', () => {
        expect(lintAssetFile('x.svg', 100, '<svg><use href="#local"/><rect/></svg>')).toEqual([])
    })
    test('svg with unquoted event handler rejected', () => {
        expect(lintAssetFile('x.svg', 100, '<svg/onload=alert(1)>').length).toBeGreaterThan(0)
    })
    test('svg with unquoted external href rejected', () => {
        expect(
            lintAssetFile('x.svg', 100, '<use href=https://evil.com/a#b>').length,
        ).toBeGreaterThan(0)
    })
    test('svg with unquoted fragment href passes', () => {
        expect(lintAssetFile('x.svg', 100, '<use href=#local />')).toEqual([])
    })
    test('namespace-prefixed script rejected', () => {
        const svg = '<svg xmlns:s="http://www.w3.org/2000/svg"><s:script>alert(1)</s:script></svg>'
        expect(lintAssetFile('x.svg', 100, svg).length).toBeGreaterThan(0)
    })
    test('style element rejected', () => {
        expect(
            lintAssetFile(
                'x.svg',
                100,
                '<svg><style>@import url(https://evil.com/a.css)</style></svg>',
            ).length,
        ).toBeGreaterThan(0)
    })
    test('SMIL set element rejected', () => {
        expect(
            lintAssetFile('x.svg', 100, '<svg><set attributeName="onload" to="alert(1)"/></svg>')
                .length,
        ).toBeGreaterThan(0)
    })
    test('DOCTYPE rejected', () => {
        const svg = '<!DOCTYPE svg [<!ENTITY xxe SYSTEM "file:///etc/passwd">]><svg/>'
        expect(lintAssetFile('x.svg', 100, svg).length).toBeGreaterThan(0)
    })
    test('href with leading whitespace before javascript: rejected', () => {
        expect(
            lintAssetFile('x.svg', 100, '<a href=" javascript:alert(1)">x</a>').length,
        ).toBeGreaterThan(0)
    })
    test('external use href with leading whitespace rejected', () => {
        expect(
            lintAssetFile('x.svg', 100, '<use xlink:href=" https://evil.com/x.svg#a"/>').length,
        ).toBeGreaterThan(0)
    })
    test('svg content disguised under a png extension rejected', () => {
        expect(
            lintAssetFile('x.svg.png', 100, '<svg><script>1</script></svg>').length,
        ).toBeGreaterThan(0)
    })
})
