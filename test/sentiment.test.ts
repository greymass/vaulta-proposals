import { describe, expect, test } from 'bun:test'
import { lintTopicCitation, topicCitationLine } from '$lib/sentiment'

const VP = 'VP-0003'
const SLUG = 'vp-0003-rfp-program'
const COMMIT = 'e35714a0faee03a53d689df4464c3a063de20ca4'
const CITATION = `${VP} https://github.com/greymass/vaulta-proposals/blob/${COMMIT}/proposals/${SLUG}/proposal.md`

describe('topicCitationLine', () => {
    test('takes the first line of a multi-line description', () => {
        expect(topicCitationLine(`${CITATION}\n\nShould the network?`)).toBe(CITATION)
    })
    test('takes the whole of a single-line description', () => {
        expect(topicCitationLine('Should the network?')).toBe('Should the network?')
    })
    test('strips a carriage return left by CRLF', () => {
        expect(topicCitationLine(`${CITATION}\r\nmore`)).toBe(CITATION)
    })
    test('empty description yields an empty line', () => {
        expect(topicCitationLine('')).toBe('')
    })
})

describe('lintTopicCitation', () => {
    test('a conformant citation parses clean', () => {
        const check = lintTopicCitation(`${CITATION}\n\nfree text`, VP, SLUG)
        expect(check.cited).toBe(true)
        expect(check.problems).toEqual([])
        expect(check.parsed?.commit).toBe(COMMIT)
    })

    // VPS-1 makes the back-reference advisory, so a description that never claims one is conformant.
    test('a description with no citation is uncited, not a problem', () => {
        const check = lintTopicCitation('Should the network fund an RFP program?', VP, SLUG)
        expect(check.cited).toBe(false)
        expect(check.problems).toEqual([])
    })

    test('a first line that opens like a citation but does not parse is reported', () => {
        const check = lintTopicCitation(
            'VP-0003 https://unicove.com/vaulta/proposals/vp-0003\n\nfree text',
            VP,
            SLUG,
        )
        expect(check.cited).toBe(false)
        expect(check.problems).toHaveLength(1)
        expect(check.problems[0]).toContain('does not match the VPS-1 back-reference form')
    })

    test('a citation naming another proposal is reported', () => {
        const other = `VP-0002 https://github.com/greymass/vaulta-proposals/blob/${COMMIT}/proposals/vp-0002-account-creation/proposal.md`
        const check = lintTopicCitation(other, VP, SLUG)
        expect(check.cited).toBe(true)
        expect(check.problems).toEqual([
            `topic cites VP-0002, but it is bound to ${VP}`,
            `topic cites proposals/vp-0002-account-creation, but this proposal is proposals/${SLUG}`,
        ])
    })

    test('a citation to a foreign repository is reported', () => {
        const foreign = `${VP} https://github.com/someone/fork/blob/${COMMIT}/proposals/${SLUG}/proposal.md`
        const check = lintTopicCitation(foreign, VP, SLUG)
        expect(check.cited).toBe(true)
        expect(check.problems.some((p) => p.includes('canonical repository'))).toBe(true)
    })

    test('the all-zero placeholder commit is reported', () => {
        const zero = `${VP} https://github.com/greymass/vaulta-proposals/blob/${'0'.repeat(40)}/proposals/${SLUG}/proposal.md`
        const check = lintTopicCitation(zero, VP, SLUG)
        expect(check.cited).toBe(true)
        expect(check.problems.some((p) => p.includes('all-zero placeholder'))).toBe(true)
    })
})
