import { describe, expect, it, test } from 'bun:test'
import {
    checkMsigTitlesMirror,
    checkRevisionsMirror,
    resolveUpdated,
    validateFrontmatter,
} from '../lib/frontmatter'
import type { RevisionEntry } from '../lib/types'

const valid = () => ({
    vp: 'VP-0001',
    title: 'Test Proposal',
    standard: 'VPS-1',
    status: 'Draft',
    authors: ['Aaron Cox (Greymass)'],
    created: '2026-08-01',
    accounts: ['ram.vaulta'],
    msigs: [{ proposer: 'greymassfuel', proposal: 'giftram', status: 'active' }],
    sentiment: [{ contract: 'sentiment.gm', topic: 'ramgifting' }],
    requires: [],
})

const SLUG = 'vp-0001-test-proposal'

describe('validateFrontmatter v2', () => {
    test('accepts a valid draft', () => {
        const { value, errors } = validateFrontmatter(valid(), SLUG)
        expect(errors).toEqual([])
        expect(value?.standard).toBe('VPS-1')
    })
    test('rejects unknown keys', () => {
        const { errors } = validateFrontmatter({ ...valid(), updated: '2026-08-01' }, SLUG)
        expect(errors.some((e) => e.includes('unknown key "updated"'))).toBe(true)
    })
    test('requires standard field', () => {
        const fm: Record<string, unknown> = valid()
        delete fm.standard
        const { errors } = validateFrontmatter(fm, SLUG)
        expect(errors.some((e) => e.includes('standard'))).toBe(true)
    })
    test('accepts Superseded status with superseded-by', () => {
        const fm = {
            ...valid(),
            status: 'Superseded',
            'superseded-by': ['VP-0002'],
        }
        expect(validateFrontmatter(fm, SLUG).errors).toEqual([])
    })
    test('rejects Superseded without superseded-by', () => {
        const { errors } = validateFrontmatter({ ...valid(), status: 'Superseded' }, SLUG)
        expect(errors.some((e) => e.includes('superseded-by'))).toBe(true)
    })
    test('rejects superseded-by when not Superseded', () => {
        const fm = { ...valid(), 'superseded-by': ['VP-0002'] }
        expect(validateFrontmatter(fm, SLUG).errors.length).toBeGreaterThan(0)
    })
    test('msig txid required exactly when executed', () => {
        const executed = {
            ...valid(),
            msigs: [{ proposer: 'greymassfuel', proposal: 'giftram', status: 'executed' }],
        }
        expect(validateFrontmatter(executed, SLUG).errors.some((e) => e.includes('txid'))).toBe(
            true,
        )
        const active = {
            ...valid(),
            msigs: [
                {
                    proposer: 'greymassfuel',
                    proposal: 'giftram',
                    status: 'active',
                    txid: 'a'.repeat(64),
                },
            ],
        }
        expect(validateFrontmatter(active, SLUG).errors.some((e) => e.includes('txid'))).toBe(true)
    })
    test('sentiment entries are name pairs, not numbers', () => {
        const { errors } = validateFrontmatter({ ...valid(), sentiment: [1] }, SLUG)
        expect(errors.some((e) => e.includes('sentiment'))).toBe(true)
    })
    test('rejects invalid antelope names', () => {
        const { errors } = validateFrontmatter({ ...valid(), accounts: ['UPPER'] }, SLUG)
        expect(errors.some((e) => e.includes('accounts'))).toBe(true)
    })
    test('excerpt is optional', () => {
        const { value, errors } = validateFrontmatter(valid(), SLUG)
        expect(errors).toEqual([])
        expect(value?.excerpt).toBeUndefined()
    })
    test('accepts a string excerpt', () => {
        const { value, errors } = validateFrontmatter(
            { ...valid(), excerpt: 'A short summary.' },
            SLUG,
        )
        expect(errors).toEqual([])
        expect(value?.excerpt).toBe('A short summary.')
    })
    test('rejects a non-string excerpt', () => {
        const { errors } = validateFrontmatter({ ...valid(), excerpt: 42 }, SLUG)
        expect(errors.some((e) => e.includes('excerpt must be a string when present'))).toBe(true)
    })
    test('accepts an excerpt of exactly 280 code points', () => {
        const { errors } = validateFrontmatter({ ...valid(), excerpt: 'a'.repeat(280) }, SLUG)
        expect(errors).toEqual([])
    })
    test('rejects an excerpt of 281 code points', () => {
        const { errors } = validateFrontmatter({ ...valid(), excerpt: 'a'.repeat(281) }, SLUG)
        expect(errors.some((e) => e.includes('280 characters or fewer (got 281)'))).toBe(true)
    })
    test('counts astral characters as one code point each', () => {
        const excerpt = '\u{1F600}'.repeat(280)
        const { errors } = validateFrontmatter({ ...valid(), excerpt }, SLUG)
        expect(errors).toEqual([])
    })
    test('rejects an excerpt containing a newline', () => {
        const { errors } = validateFrontmatter({ ...valid(), excerpt: 'line one\nline two' }, SLUG)
        expect(errors.some((e) => e.includes('excerpt'))).toBe(true)
    })
    test.each(['`code`', 'a [link]', 'array[0]', '{@include}'])(
        'rejects markup marker in %s',
        (excerpt) => {
            const { errors } = validateFrontmatter({ ...valid(), excerpt }, SLUG)
            expect(errors.some((e) => e.includes('excerpt'))).toBe(true)
        },
    )
    test('resolution required iff Executed and must match executed msig txid', () => {
        const txid = 'b'.repeat(64)
        const base = {
            ...valid(),
            status: 'Executed',
            msigs: [
                {
                    proposer: 'greymassfuel',
                    proposal: 'giftram',
                    status: 'executed',
                    txid,
                },
            ],
        }
        expect(validateFrontmatter(base, SLUG).errors.some((e) => e.includes('resolution'))).toBe(
            true,
        )
        expect(validateFrontmatter({ ...base, resolution: txid }, SLUG).errors).toEqual([])
        expect(
            validateFrontmatter({ ...base, resolution: 'c'.repeat(64) }, SLUG).errors.length,
        ).toBeGreaterThan(0)
        expect(
            validateFrontmatter({ ...valid(), resolution: txid }, SLUG).errors.length,
        ).toBeGreaterThan(0) // forbidden when not Executed
    })
})

describe('checkRevisions (via validateFrontmatter)', () => {
    const revisions = (): RevisionEntry[] => [
        { version: 1, date: '2026-08-02', summary: 'Initial draft.' },
        {
            version: 2,
            date: '2026-08-11',
            summary: 'Raised creator admission to a 15/21 BP MSIG.',
        },
    ]

    test('absent revisions stays valid (unversioned)', () => {
        const { errors } = validateFrontmatter(valid(), SLUG)
        expect(errors).toEqual([])
    })

    test('a valid revisions list passes', () => {
        const { value, errors } = validateFrontmatter({ ...valid(), revisions: revisions() }, SLUG)
        expect(errors).toEqual([])
        expect(value?.revisions).toHaveLength(2)
    })

    test('rejects a version gap', () => {
        const bad = [
            revisions()[0],
            { version: 3, date: '2026-08-11', summary: 'Skipped a version.' },
        ]
        const { errors } = validateFrontmatter({ ...valid(), revisions: bad }, SLUG)
        expect(errors.some((e) => e.includes('revisions[1].version'))).toBe(true)
    })

    test('rejects versions that do not start at 1', () => {
        const bad = [{ version: 2, date: '2026-08-02', summary: 'Wrong start.' }]
        const { errors } = validateFrontmatter({ ...valid(), revisions: bad }, SLUG)
        expect(errors.some((e) => e.includes('revisions[0].version'))).toBe(true)
    })

    test('rejects non-monotonic dates', () => {
        const bad = [
            { version: 1, date: '2026-08-11', summary: 'Later date first.' },
            { version: 2, date: '2026-08-02', summary: 'Earlier date second.' },
        ]
        const { errors } = validateFrontmatter({ ...valid(), revisions: bad }, SLUG)
        expect(errors.some((e) => e.includes('revisions[1].date'))).toBe(true)
    })

    test('rejects a revision date earlier than created', () => {
        const bad = [{ version: 1, date: '2026-07-01', summary: 'Before created.' }]
        const { errors } = validateFrontmatter({ ...valid(), revisions: bad }, SLUG)
        expect(errors.some((e) => e.includes('revisions[0].date') && e.includes('created'))).toBe(
            true,
        )
    })

    test('accepts a summary of exactly 140 code points', () => {
        const bad = [{ version: 1, date: '2026-08-02', summary: 'a'.repeat(140) }]
        const { errors } = validateFrontmatter({ ...valid(), revisions: bad }, SLUG)
        expect(errors).toEqual([])
    })

    test('rejects a summary of 141 code points', () => {
        const bad = [{ version: 1, date: '2026-08-02', summary: 'a'.repeat(141) }]
        const { errors } = validateFrontmatter({ ...valid(), revisions: bad }, SLUG)
        expect(errors.some((e) => e.includes('revisions[0].summary'))).toBe(true)
    })

    test('rejects an empty summary', () => {
        const bad = [{ version: 1, date: '2026-08-02', summary: '' }]
        const { errors } = validateFrontmatter({ ...valid(), revisions: bad }, SLUG)
        expect(errors.some((e) => e.includes('revisions[0].summary'))).toBe(true)
    })

    test.each(['`code`', 'a [link]', 'array[0]', '{@include}'])(
        'rejects markup marker in summary %s',
        (summary) => {
            const bad = [{ version: 1, date: '2026-08-02', summary }]
            const { errors } = validateFrontmatter({ ...valid(), revisions: bad }, SLUG)
            expect(errors.some((e) => e.includes('revisions[0].summary'))).toBe(true)
        },
    )

    test('normalizes Date-typed dates from the YAML parser', () => {
        const bad = [{ version: 1, date: new Date('2026-08-02T00:00:00Z'), summary: 'Draft.' }]
        const fm = {
            ...valid(),
            created: new Date('2026-08-01T00:00:00Z'),
            revisions: bad,
        }
        const { value, errors } = validateFrontmatter(fm, SLUG)
        expect(errors).toEqual([])
        expect(value?.revisions?.[0].date).toBe('2026-08-02')
        expect(value?.created).toBe('2026-08-01')
    })

    test('rejects an unknown key on a revision entry', () => {
        const bad = [{ version: 1, date: '2026-08-02', summary: 'Draft.', author: 'someone' }]
        const { errors } = validateFrontmatter({ ...valid(), revisions: bad }, SLUG)
        expect(errors.some((e) => e.includes('unknown key "author"'))).toBe(true)
    })
})

describe('checkRevisionsMirror', () => {
    test('matching lists produce no errors', () => {
        const errors: string[] = []
        checkRevisionsMirror(
            [{ version: 1, date: '2026-08-02', summary: 'Initial draft.' }],
            [{ version: 1, date: '2026-08-02', summary: '초안.' }],
            errors,
        )
        expect(errors).toEqual([])
    })

    test('both sides absent produce no errors', () => {
        const errors: string[] = []
        checkRevisionsMirror(undefined, undefined, errors)
        expect(errors).toEqual([])
    })

    test('rejects a length mismatch', () => {
        const errors: string[] = []
        checkRevisionsMirror(
            [
                { version: 1, date: '2026-08-02', summary: 'Initial draft.' },
                { version: 2, date: '2026-08-11', summary: 'Second entry.' },
            ],
            [{ version: 1, date: '2026-08-02', summary: '초안.' }],
            errors,
        )
        expect(errors.some((e) => e.includes('length'))).toBe(true)
    })

    test('rejects a date mismatch', () => {
        const errors: string[] = []
        checkRevisionsMirror(
            [{ version: 1, date: '2026-08-02', summary: 'Initial draft.' }],
            [{ version: 1, date: '2026-08-03', summary: '초안.' }],
            errors,
        )
        expect(errors.some((e) => e.includes('revisions[0].date'))).toBe(true)
    })

    test('rejects a translation with revisions when English has none', () => {
        const errors: string[] = []
        checkRevisionsMirror(
            undefined,
            [{ version: 1, date: '2026-08-02', summary: '초안.' }],
            errors,
        )
        expect(errors.length).toBeGreaterThan(0)
    })

    test('rejects English revisions with no translation mirror', () => {
        const errors: string[] = []
        checkRevisionsMirror(
            [{ version: 1, date: '2026-08-02', summary: 'Initial draft.' }],
            undefined,
            errors,
        )
        expect(errors.length).toBeGreaterThan(0)
    })
})

describe('resolveUpdated', () => {
    test('with revisions, resolves to the latest revision date', () => {
        const revisions: RevisionEntry[] = [
            { version: 1, date: '2026-08-02', summary: 'Initial draft.' },
            { version: 2, date: '2026-08-11', summary: 'Second entry.' },
        ]
        expect(resolveUpdated(revisions, '2026-01-01')).toBe('2026-08-11')
    })

    test('without revisions, falls back to the git-derived date', () => {
        expect(resolveUpdated(undefined, '2026-01-01')).toBe('2026-01-01')
    })

    test('an empty revisions list falls back to the git-derived date', () => {
        expect(resolveUpdated([], '2026-01-01')).toBe('2026-01-01')
    })

    test('no revisions and a null git date stays null', () => {
        expect(resolveUpdated(undefined, null)).toBeNull()
    })

    test('takes the maximum date rather than assuming the list is sorted', () => {
        const revisions: RevisionEntry[] = [
            { version: 1, date: '2026-08-11', summary: 'Out of order.' },
            { version: 2, date: '2026-08-02', summary: 'Out of order.' },
        ]
        expect(resolveUpdated(revisions, '2026-01-01')).toBe('2026-08-11')
    })
})

describe('msigs step entries', () => {
    const base = {
        vp: 'VP-0001',
        title: 'Test',
        standard: 'VPS-1',
        status: 'Draft',
        authors: ['A'],
        created: '2026-01-01',
        accounts: [],
        sentiment: [],
        requires: [],
    }
    const validate = (msigs: unknown) => {
        const { errors } = validateFrontmatter({ ...base, msigs }, 'vp-0001-test')
        return errors
    }

    it('accepts a planned entry with no proposer or proposal', () => {
        expect(validate([{ status: 'planned', title: 'Create the treasury account' }])).toEqual([])
    })

    it('rejects a planned entry that carries a binding', () => {
        const errors = validate([{ status: 'planned', proposer: 'test.gm', proposal: 'aaa' }])
        expect(errors.join(' ')).toContain('planned')
    })

    it('requires proposer and proposal on a non-planned entry', () => {
        const errors = validate([{ status: 'active' }])
        expect(errors.join(' ')).toContain('proposer')
    })

    it('accepts a title of 140 characters and rejects 141', () => {
        expect(validate([{ status: 'planned', title: 'x'.repeat(140) }])).toEqual([])
        expect(validate([{ status: 'planned', title: 'x'.repeat(141) }]).join(' ')).toContain(
            '1-140',
        )
    })

    it('rejects an empty title', () => {
        expect(validate([{ status: 'planned', title: '' }]).join(' ')).toContain('1-140')
    })

    it('rejects a multi-line title', () => {
        expect(validate([{ status: 'planned', title: 'a\nb' }]).join(' ')).toContain('single line')
    })

    it('rejects markup in a title', () => {
        expect(validate([{ status: 'planned', title: 'use `code`' }]).join(' ')).toContain(
            'plain text',
        )
    })

    it('rejects an unknown key inside an entry', () => {
        const errors = validate([{ status: 'planned', title: 'ok', notes: 'no' }])
        expect(errors.join(' ')).toContain('unknown key')
    })
})

describe('msigs supersedes', () => {
    const base = {
        vp: 'VP-0001',
        title: 'Test',
        standard: 'VPS-1',
        status: 'Draft',
        authors: ['A'],
        created: '2026-01-01',
        accounts: [],
        sentiment: [],
        requires: [],
    }
    const validate = (msigs: unknown) => {
        const { errors } = validateFrontmatter({ ...base, msigs }, 'vp-0001-test')
        return errors
    }
    const expired = { proposer: 'test.gm', proposal: 'aaaaaaaaaaaa', status: 'expired' }

    it('accepts a retry that supersedes an earlier expired entry', () => {
        expect(
            validate([
                expired,
                {
                    proposer: 'test.gm',
                    proposal: 'bbbbbbbbbbbb',
                    status: 'active',
                    supersedes: { proposer: 'test.gm', proposal: 'aaaaaaaaaaaa' },
                },
            ]),
        ).toEqual([])
    })

    it('rejects a supersedes target that does not exist', () => {
        const errors = validate([
            {
                proposer: 'test.gm',
                proposal: 'bbbbbbbbbbbb',
                status: 'active',
                supersedes: { proposer: 'test.gm', proposal: 'cccccccccccc' },
            },
        ])
        expect(errors.join(' ')).toContain('must name an earlier entry')
    })

    it('rejects a supersedes target that appears later in the list', () => {
        const errors = validate([
            {
                proposer: 'test.gm',
                proposal: 'bbbbbbbbbbbb',
                status: 'active',
                supersedes: { proposer: 'test.gm', proposal: 'aaaaaaaaaaaa' },
            },
            expired,
        ])
        expect(errors.join(' ')).toContain('must name an earlier entry')
    })

    it('rejects superseding an executed entry', () => {
        const errors = validate([
            {
                proposer: 'test.gm',
                proposal: 'aaaaaaaaaaaa',
                status: 'executed',
                txid: 'a'.repeat(64),
            },
            {
                proposer: 'test.gm',
                proposal: 'bbbbbbbbbbbb',
                status: 'active',
                supersedes: { proposer: 'test.gm', proposal: 'aaaaaaaaaaaa' },
            },
        ])
        expect(errors.join(' ')).toContain('expired or cancelled')
    })

    it('rejects two entries superseding the same entry', () => {
        const errors = validate([
            expired,
            {
                proposer: 'test.gm',
                proposal: 'bbbbbbbbbbbb',
                status: 'cancelled',
                supersedes: { proposer: 'test.gm', proposal: 'aaaaaaaaaaaa' },
            },
            {
                proposer: 'test.gm',
                proposal: 'cccccccccccc',
                status: 'active',
                supersedes: { proposer: 'test.gm', proposal: 'aaaaaaaaaaaa' },
            },
        ])
        expect(errors.join(' ')).toContain('already superseded')
    })

    it('rejects an unknown key inside supersedes', () => {
        const errors = validate([
            expired,
            {
                proposer: 'test.gm',
                proposal: 'bbbbbbbbbbbb',
                status: 'active',
                supersedes: { proposer: 'test.gm', proposal: 'aaaaaaaaaaaa', why: 'x' },
            },
        ])
        expect(errors.join(' ')).toContain('unknown key')
    })
})

describe('checkMsigTitlesMirror', () => {
    const run = (en: unknown, tr: unknown) => {
        const errors: string[] = []
        checkMsigTitlesMirror(en as never, tr as never, errors)
        return errors
    }
    const titled = [
        { status: 'planned', title: 'Create the account' },
        { proposer: 'test.gm', proposal: 'aaaaaaaaaaaa', status: 'active' },
        { status: 'planned', title: 'Deploy the contract' },
    ]

    it('passes when neither side has titles', () => {
        expect(run([{ proposer: 'a', proposal: 'b', status: 'active' }], undefined)).toEqual([])
    })

    it('requires the translation list when English has a title', () => {
        expect(run(titled, undefined).join(' ')).toContain('must be present')
    })

    it('rejects the translation list when English has no titles', () => {
        const errors = run(
            [{ proposer: 'a', proposal: 'b', status: 'active' }],
            [{ step: 1, title: 'x' }],
        )
        expect(errors.join(' ')).toContain('must be present')
    })

    it('accepts one entry per titled English entry in ascending step order', () => {
        expect(
            run(titled, [
                { step: 1, title: '계정 생성' },
                { step: 3, title: '컨트랙트 배포' },
            ]),
        ).toEqual([])
    })

    it('rejects a step that names an untitled English entry', () => {
        const errors = run(titled, [
            { step: 1, title: 'a' },
            { step: 2, title: 'b' },
            { step: 3, title: 'c' },
        ])
        expect(errors.join(' ')).toContain('does not carry a title')
    })

    it('rejects a missing step', () => {
        const errors = run(titled, [{ step: 1, title: 'a' }])
        expect(errors.join(' ')).toContain('missing')
    })

    it('rejects an out-of-range step', () => {
        const errors = run(titled, [
            { step: 1, title: 'a' },
            { step: 9, title: 'b' },
        ])
        expect(errors.join(' ')).toContain('out of range')
    })

    it('rejects a duplicated step', () => {
        const errors = run(titled, [
            { step: 1, title: 'a' },
            { step: 1, title: 'b' },
            { step: 3, title: 'c' },
        ])
        expect(errors.join(' ')).toContain('duplicate')
    })

    it('rejects descending step order', () => {
        const errors = run(titled, [
            { step: 3, title: 'a' },
            { step: 1, title: 'b' },
        ])
        expect(errors.join(' ')).toContain('ascending')
    })

    it('validates translated title text independently', () => {
        const errors = run(titled, [
            { step: 1, title: '' },
            { step: 3, title: 'ok' },
        ])
        expect(errors.join(' ')).toContain('1-140')
    })
})
