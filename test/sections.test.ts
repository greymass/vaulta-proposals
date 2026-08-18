import { describe, expect, test } from 'bun:test'
import { lintSections, lintStructureMirror } from '$lib/sections'

const good = `# Title

## Summary

Something.

## Mechanics

Details.

## Open Questions

None.

## Next Steps

Merge it.
`

describe('lintSections', () => {
    test('accepts conforming body', () => {
        expect(lintSections(good)).toEqual([])
    })
    test('Summary must be first', () => {
        const body = good.replace('## Summary\n\nSomething.\n\n', '')
        expect(lintSections(body).length).toBeGreaterThan(0)
    })
    test('nothing may follow Next Steps', () => {
        const body = `${good}\n## Appendix\n\nStuff.\n`
        expect(lintSections(body).length).toBeGreaterThan(0)
    })
    test('core sections must be non-empty', () => {
        const body = good.replace('None.\n', '')
        expect(lintSections(body).some((e) => e.includes('Open Questions'))).toBe(true)
    })
    test('exact case required', () => {
        const body = good.replace('## Summary', '## summary')
        expect(lintSections(body).length).toBeGreaterThan(0)
    })
    test('multiple # headings rejected', () => {
        expect(lintSections(`${good}\n# Another\n`).length).toBeGreaterThan(0)
    })
})

describe('lintStructureMirror', () => {
    test('same section count passes', () => {
        const translated = good
            .replace('## Summary', '## 요약')
            .replace('## Mechanics', '## 방식')
            .replace('## Open Questions', '## 남은 질문')
            .replace('## Next Steps', '## 다음 단계')
        expect(lintStructureMirror(good, translated)).toEqual([])
    })
    test('dropped section fails', () => {
        const translated = good.replace('## Mechanics\n\nDetails.\n\n', '')
        expect(lintStructureMirror(good, translated).length).toBeGreaterThan(0)
    })
})
