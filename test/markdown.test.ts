import { describe, expect, test } from 'bun:test'
import { lintLinks } from '../lib/links'
import { lintFences, lintRawHtml, stripCode } from '../lib/markdown'

const opts = { slug: 'vp-0001-ram-gifting', fileExists: () => true }

describe('scanLines fence tracking', () => {
    test('a three-backtick line inside a four-backtick fence does not desync', () => {
        // A crafted payload after the block must still be seen by the link lint.
        const body = ['````', '```', '````', '', 'https://evil.example.com/claim'].join('\n')
        expect(lintLinks(body, opts).length).toBeGreaterThan(0)
    })
    test('content hidden by a tilde-fence desync is still linted', () => {
        const body = ['~~~', '```', '~~~', '', 'https://evil.example.com/x'].join('\n')
        expect(lintLinks(body, opts).length).toBeGreaterThan(0)
    })
    test('stripCode removes matched fenced blocks', () => {
        expect(stripCode('a\n```\nsecret\n```\nb').split('\n')).toEqual(['a', 'b'])
    })
})

describe('lintFences', () => {
    test('balanced fences pass', () => {
        expect(lintFences('a\n```\nx\n```\nb')).toEqual([])
    })
    test('unterminated fence is reported', () => {
        expect(lintFences('a\n```\nx\n').length).toBeGreaterThan(0)
    })
})

describe('lintRawHtml', () => {
    test('script tag rejected', () => {
        expect(lintRawHtml('# T\n\n<script>alert(1)</script>').length).toBeGreaterThan(0)
    })
    test('img onerror rejected', () => {
        expect(lintRawHtml('text\n\n<img src=x onerror=alert(1)>').length).toBeGreaterThan(0)
    })
    test('protocol-relative iframe rejected', () => {
        expect(lintRawHtml('<iframe src="//evil.com/x"></iframe>').length).toBeGreaterThan(0)
    })
    test('backticked angle-bracket names are allowed', () => {
        expect(lintRawHtml('Call `giftacct(name op, name to)` with `<memo>`.')).toEqual([])
    })
    test('prose comparisons are allowed', () => {
        expect(lintRawHtml('when used < quota the gift proceeds')).toEqual([])
    })
    test('html inside a code fence is allowed', () => {
        expect(lintRawHtml('```\n<script>ok in a sample</script>\n```')).toEqual([])
    })
})
