import { describe, expect, test } from 'bun:test'
import { lintLinks } from '$lib/links'
import { lintFences, lintRawHtml, stripCode } from '$lib/markdown'

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

describe('stripCode indented blocks', () => {
    test('an indented block after a blank line is removed', () => {
        expect(stripCode('para\n\n    secret code\n\nafter')).not.toContain('secret code')
    })
    test('an indented block at the start of the body is removed', () => {
        expect(stripCode('    secret code\n\nafter')).not.toContain('secret code')
    })
    test('every line of a multi-line indented block is removed', () => {
        const body = 'para\n\n    first line\n    second line\n\nafter'
        const stripped = stripCode(body)
        expect(stripped).not.toContain('first line')
        expect(stripped).not.toContain('second line')
        expect(stripped).toContain('after')
    })
    test('indented text continuing a paragraph is kept', () => {
        expect(stripCode('para\n    still the paragraph')).toContain('still the paragraph')
    })
    test('indented text inside a list item is kept', () => {
        expect(stripCode('- item\n\n    nested prose')).toContain('nested prose')
    })
    test('indented text inside an ordered list item is kept', () => {
        expect(stripCode('1. item\n\n    nested prose')).toContain('nested prose')
    })
    test('an indented block after a list has ended is removed', () => {
        const body = '- item\n\nback to prose\n\n    secret code\n'
        expect(stripCode(body)).not.toContain('secret code')
    })
    test('prose after an indented block is kept', () => {
        expect(stripCode('para\n\n    code\nafter')).toContain('after')
    })
    test('inline code spans are still removed', () => {
        expect(stripCode('a `x` b')).toBe('a  b')
    })
    test('a fenced block indented inside prose is unaffected', () => {
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
    test('html inside an indented code block is allowed', () => {
        expect(lintRawHtml('Example:\n\n    <script>ok in a sample</script>')).toEqual([])
    })
    test('html inside a list item is still rejected', () => {
        expect(lintRawHtml('- item\n\n    <script>alert(1)</script>').length).toBeGreaterThan(0)
    })
})

describe('lints ignore indented code blocks', () => {
    test('a reference-style link inside an indented block is allowed', () => {
        expect(lintLinks('Example:\n\n    See [text][label] here', opts)).toEqual([])
    })
    test('a bare URL inside an indented block is allowed', () => {
        expect(lintLinks('Example:\n\n    curl https://evil.example.com/x', opts)).toEqual([])
    })
    test('a bare URL after an indented block is still reported', () => {
        const body = 'Example:\n\n    curl https://evil.example.com/x\n\nhttps://evil.example.com/y'
        expect(lintLinks(body, opts).length).toBeGreaterThan(0)
    })
})
