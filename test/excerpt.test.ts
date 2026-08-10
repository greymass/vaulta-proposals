import { describe, expect, test } from 'bun:test'
import { extractCardFields } from '../lib/excerpt'

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
