import { describe, expect, test } from 'bun:test'
import { extractCardFields, resolveExcerpt } from '$lib/excerpt'

const en = `# Network RAM **Endowment** for Onboarding
[English](proposal.md) | [한국어](proposal.ko.md) | [中文](proposal.zh.md)

## Summary

A network-owned account (\`ram.vaulta\`) holds a [RAM endowment](../other/proposal.md)
sourced from *existing* holdings.

Second paragraph is not part of the excerpt.

## Rationale

Why.
`

const ko = `# 계정 온보딩을 위한 네트워크 RAM 기금
[English](proposal.md) | [한국어](proposal.ko.md) | [中文](proposal.zh.md)

## 요약

네트워크 소유 계정(\`ram.vaulta\`)은 RAM 기금을 보유합니다.

## 근거

이유.
`

describe('extractCardFields', () => {
    test('title taken from the # line with markdown stripped', () => {
        expect(extractCardFields(en).title).toBe('Network RAM Endowment for Onboarding')
    })
    test('excerpt is the first paragraph of the first ## section', () => {
        expect(extractCardFields(en).excerpt).toBe(
            'A network-owned account (ram.vaulta) holds a RAM endowment sourced from existing holdings.',
        )
    })
    test('nav line is not the excerpt', () => {
        expect(extractCardFields(en).excerpt).not.toContain('English')
    })
    test('second paragraph excluded', () => {
        expect(extractCardFields(en).excerpt).not.toContain('Second paragraph')
    })
    test('translated body uses its own heading and title', () => {
        const fields = extractCardFields(ko)
        expect(fields.title).toBe('계정 온보딩을 위한 네트워크 RAM 기금')
        expect(fields.excerpt).toBe('네트워크 소유 계정(ram.vaulta)은 RAM 기금을 보유합니다.')
    })
    test('literal None. summary ships as-is', () => {
        const body = '# T\n[English](proposal.md)\n\n## Summary\n\nNone.\n'
        expect(extractCardFields(body).excerpt).toBe('None.')
    })
    test('missing sections yield empty strings', () => {
        expect(extractCardFields('plain text only')).toEqual({ title: '', excerpt: '' })
    })
})

describe('extractCardFields CJK line joining', () => {
    test('wrapped Chinese paragraph joins with no stray space', () => {
        const body = '# T\n\n## 摘要\n\n各级标题、\n表格样式保持一致。\n'
        expect(extractCardFields(body).excerpt).toBe('各级标题、表格样式保持一致。')
    })
    test('wrapped Korean paragraph joins with no stray space at the break, genuine spaces kept', () => {
        const body = '# T\n\n## 요약\n\n안녕하세요 반갑\n습니다 감사합니다\n'
        expect(extractCardFields(body).excerpt).toBe('안녕하세요 반갑습니다 감사합니다')
    })
    test('wrapped English paragraph still joins with a space', () => {
        const body = '# T\n\n## Summary\n\nThis sentence wraps\nacross two lines.\n'
        expect(extractCardFields(body).excerpt).toBe('This sentence wraps across two lines.')
    })
    test('mixed boundary: Latin then CJK joins with no space', () => {
        const body = '# T\n\n## Summary\n\nSee proposal\n中文版本。\n'
        expect(extractCardFields(body).excerpt).toBe('See proposal中文版本。')
    })
    test('mixed boundary: CJK then Latin joins with no space', () => {
        const body = '# T\n\n## Summary\n\n请见提案\nEnglish version.\n'
        expect(extractCardFields(body).excerpt).toBe('请见提案English version.')
    })
})

describe('resolveExcerpt', () => {
    test('authored value wins over extraction', () => {
        expect(resolveExcerpt('Authored excerpt.', en)).toBe('Authored excerpt.')
    })
    test('absent authored value falls back to extraction', () => {
        expect(resolveExcerpt(undefined, en)).toBe(extractCardFields(en).excerpt)
    })
    test('empty-string authored value is treated as absent', () => {
        expect(resolveExcerpt('', en)).toBe(extractCardFields(en).excerpt)
    })
    test('stripInline runs over the authored value', () => {
        expect(resolveExcerpt('An **authored** excerpt.', en)).toBe('An authored excerpt.')
    })
})
