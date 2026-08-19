import { describe, expect, test } from 'bun:test'
import type { Action } from '@wharfkit/antelope'
import {
    checkCitationActions,
    checkCitationCommit,
    citationAction,
    citationFromActions,
    citationLine,
    lintCitationActions,
    lintCitationLine,
    parseCitationLine,
    parseRemoteRepo,
    prependCitation,
    selectCanonicalRemote,
} from '$lib/citation'
import { eosio, msigmessager } from '$lib/contracts'
import type { BuildContext, MsigBuilder } from '$lib/types'

const COMMIT = '0'.repeat(40)
const REAL_COMMIT = 'ad77f8912a3b4c5d6e7f8091a2b3c4d5e6f70819'
const SYSTEM = [{ actor: 'eosio', permission: 'active' }]

function messageAction(message: string): Action {
    return msigmessager.action('message', { message }, { authorization: SYSTEM })
}

function payloadAction(): Action {
    return eosio.action(
        'buyrambytes',
        { payer: 'eosio', receiver: 'eosio', bytes: 8192 },
        { authorization: SYSTEM },
    )
}

describe('citationLine', () => {
    test('builds the VPS-1 back-reference line', () => {
        expect(
            citationLine({ vp: 'VP-0002', slug: 'vp-0002-account-creation', commit: COMMIT }),
        ).toBe(
            `VP-0002 https://github.com/greymass/vaulta-proposals/blob/${COMMIT}/proposals/vp-0002-account-creation/proposal.md`,
        )
    })

    test('rejects a vp that is not VP-NNNN', () => {
        expect(() => citationLine({ vp: 'VP-2', slug: 'vp-2-thing', commit: COMMIT })).toThrow(
            /VP-NNNN/,
        )
    })

    test('rejects a slug whose VP number differs from the cited VP', () => {
        expect(() =>
            citationLine({ vp: 'VP-0002', slug: 'vp-0003-something', commit: COMMIT }),
        ).toThrow(/does not carry the VP number/)
    })

    test('rejects a short or abbreviated commit', () => {
        expect(() =>
            citationLine({ vp: 'VP-0002', slug: 'vp-0002-account-creation', commit: 'abc1234' }),
        ).toThrow(/40-hex/)
    })
})

describe('parseCitationLine', () => {
    test('reads the org, repo, commit and slug out of a well-formed line', () => {
        expect(
            parseCitationLine(
                citationLine({
                    vp: 'VP-0002',
                    slug: 'vp-0002-account-creation',
                    commit: REAL_COMMIT,
                }),
            ),
        ).toEqual({
            vp: 'VP-0002',
            org: 'greymass',
            repo: 'vaulta-proposals',
            commit: REAL_COMMIT,
            slug: 'vp-0002-account-creation',
        })
    })

    test('a URL missing the proposals path segment does not parse', () => {
        expect(
            parseCitationLine(
                `VP-0002 https://github.com/greymass/vaulta-proposals/blob/${REAL_COMMIT}/vp-0002-account-creation/proposal.md`,
            ),
        ).toBeUndefined()
    })
})

describe('parseRemoteRepo', () => {
    test('reads the ssh form', () => {
        expect(parseRemoteRepo('git@github.com:greymass/vaulta-proposals.git\n')).toBe(
            'greymass/vaulta-proposals',
        )
    })
    test('reads the https form with and without the git suffix', () => {
        expect(parseRemoteRepo('https://github.com/greymass/vaulta-proposals.git')).toBe(
            'greymass/vaulta-proposals',
        )
        expect(parseRemoteRepo('https://github.com/greymass/vaulta-proposals')).toBe(
            'greymass/vaulta-proposals',
        )
    })
    test('a remote that is not github does not parse', () => {
        expect(parseRemoteRepo('git@gitlab.com:greymass/vaulta-proposals.git')).toBeUndefined()
    })
    test('case is normalized, since github resolves an owner and repository without regard to it', () => {
        expect(parseRemoteRepo('git@github.com:Greymass/Vaulta-Proposals.git')).toBe(
            'greymass/vaulta-proposals',
        )
    })
    test('a trailing slash is ignored', () => {
        expect(parseRemoteRepo('https://github.com/greymass/vaulta-proposals/')).toBe(
            'greymass/vaulta-proposals',
        )
    })
})

describe('selectCanonicalRemote', () => {
    const canonical = 'git@github.com:greymass/vaulta-proposals.git'
    const fork = 'git@github.com:someuser/vaulta-proposals.git'

    test('the canonical-only clone selects its origin', () => {
        expect(selectCanonicalRemote([{ name: 'origin', url: canonical }])).toEqual({
            name: 'origin',
            url: canonical,
        })
    })

    test('a fork setup selects upstream, not the origin that points at the fork', () => {
        expect(
            selectCanonicalRemote([
                { name: 'origin', url: fork },
                { name: 'upstream', url: canonical },
            ]),
        ).toEqual({ name: 'upstream', url: canonical })
    })

    test('the name carries no authority, so any name pointing at the canonical repository wins', () => {
        expect(
            selectCanonicalRemote([
                { name: 'canonical', url: canonical },
                { name: 'origin', url: fork },
            ])?.name,
        ).toBe('canonical')
    })

    test('two matching remotes prefer the one named origin', () => {
        expect(
            selectCanonicalRemote([
                { name: 'canonical', url: canonical },
                { name: 'origin', url: 'https://github.com/greymass/vaulta-proposals' },
            ])?.name,
        ).toBe('origin')
    })

    test('two matching remotes with neither named origin take the first', () => {
        expect(
            selectCanonicalRemote([
                { name: 'canonical', url: canonical },
                { name: 'upstream', url: canonical },
            ])?.name,
        ).toBe('canonical')
    })

    test('a differently-cased remote url still selects', () => {
        expect(
            selectCanonicalRemote([
                { name: 'origin', url: fork },
                { name: 'upstream', url: 'git@github.com:Greymass/Vaulta-Proposals.git' },
            ])?.name,
        ).toBe('upstream')
    })

    test('no remote pointing at the canonical repository selects nothing', () => {
        expect(
            selectCanonicalRemote([
                { name: 'origin', url: fork },
                { name: 'mirror', url: 'git@gitlab.com:greymass/vaulta-proposals.git' },
            ]),
        ).toBeUndefined()
        expect(selectCanonicalRemote([])).toBeUndefined()
    })

    test('the canonical repository is a parameter', () => {
        expect(
            selectCanonicalRemote([{ name: 'origin', url: fork }], 'someuser/vaulta-proposals')
                ?.name,
        ).toBe('origin')
    })
})

describe('lintCitationLine', () => {
    test('a well-formed citation naming this repository has no problems', () => {
        expect(
            lintCitationLine(
                citationLine({
                    vp: 'VP-0002',
                    slug: 'vp-0002-account-creation',
                    commit: REAL_COMMIT,
                }),
            ),
        ).toEqual([])
    })

    test('the all-zero placeholder sha is rejected', () => {
        const problems = lintCitationLine(
            citationLine({ vp: 'VP-0002', slug: 'vp-0002-account-creation', commit: COMMIT }),
        )
        expect(problems.length).toBe(1)
        expect(problems[0]).toContain('all-zero placeholder')
    })

    test('an abbreviated or uppercase sha is rejected', () => {
        expect(
            lintCitationLine(
                `VP-0002 https://github.com/greymass/vaulta-proposals/blob/ad77f89/proposals/vp-0002-account-creation/proposal.md`,
            )[0],
        ).toContain('40-character lowercase hex')
        expect(
            lintCitationLine(
                `VP-0002 https://github.com/greymass/vaulta-proposals/blob/${REAL_COMMIT.toUpperCase()}/proposals/vp-0002-account-creation/proposal.md`,
            )[0],
        ).toContain('40-character lowercase hex')
    })

    test('an org that is not the canonical repository is rejected', () => {
        const problems = lintCitationLine(
            `VP-0002 https://github.com/aaroncox/vaulta-proposals/blob/${REAL_COMMIT}/proposals/vp-0002-account-creation/proposal.md`,
        )
        expect(problems.length).toBe(1)
        expect(problems[0]).toBe(
            'citation names aaroncox/vaulta-proposals, but the canonical repository is greymass/vaulta-proposals',
        )
    })

    test('the expected repository is a parameter, so the lint stays free of git', () => {
        expect(
            lintCitationLine(
                `VP-0002 https://github.com/aaroncox/vaulta-proposals/blob/${REAL_COMMIT}/proposals/vp-0002-account-creation/proposal.md`,
                'aaroncox/vaulta-proposals',
            ),
        ).toEqual([])
    })

    test('a line that is not a citation at all is rejected', () => {
        expect(lintCitationLine('VP-0002 is a good idea')[0]).toContain(
            'does not match the VPS-1 back-reference form',
        )
    })

    test('a citation whose VP number differs from its path is rejected', () => {
        expect(
            lintCitationLine(
                `VP-0003 https://github.com/greymass/vaulta-proposals/blob/${REAL_COMMIT}/proposals/vp-0002-account-creation/proposal.md`,
            )[0],
        ).toBe('citation says VP-0003 but its URL path names vp-0002-account-creation')
    })
})

describe('checkCitationCommit', () => {
    const base = {
        vp: 'VP-0002',
        org: 'greymass',
        repo: 'vaulta-proposals',
        slug: 'vp-0002-account-creation',
    }

    test('the all-zero placeholder is left to the lint, so it keeps its own message', () => {
        expect(checkCitationCommit({ ...base, commit: COMMIT })).toEqual([])
    })

    test('a sha that is not 40-hex is left to the lint', () => {
        expect(checkCitationCommit({ ...base, commit: 'ad77f89' })).toEqual([])
    })

    test('a transaction with no citation is not checked', () => {
        expect(checkCitationActions([payloadAction()])).toEqual([])
        expect(checkCitationActions([])).toEqual([])
    })

    test('the placeholder citation reports as a placeholder and nothing else', () => {
        const actions = [
            citationAction(
                { vp: 'VP-0002', slug: 'vp-0002-account-creation', commit: COMMIT },
                SYSTEM,
            ),
            payloadAction(),
        ]
        const problems = [...lintCitationActions(actions), ...checkCitationActions(actions)]
        expect(problems.length).toBe(1)
        expect(problems[0]).toContain('all-zero placeholder')
    })
})

describe('citationFromActions', () => {
    test('decodes the message when it is the first action', () => {
        const line = citationLine({
            vp: 'VP-0002',
            slug: 'vp-0002-account-creation',
            commit: REAL_COMMIT,
        })
        expect(citationFromActions([messageAction(line), payloadAction()])).toBe(line)
    })

    test('a transaction with no actions carries no citation', () => {
        expect(citationFromActions([])).toBeUndefined()
    })

    test('a message that is not the first action is not read as a citation', () => {
        expect(citationFromActions([payloadAction(), messageAction('anything')])).toBeUndefined()
    })
})

describe('lintCitationActions', () => {
    test('a transaction with no citation is not rejected', () => {
        expect(lintCitationActions([payloadAction()])).toEqual([])
        expect(lintCitationActions([])).toEqual([])
    })

    test('the placeholder citation VP-0002 builds today is rejected', () => {
        const actions = [
            citationAction(
                { vp: 'VP-0002', slug: 'vp-0002-account-creation', commit: COMMIT },
                SYSTEM,
            ),
            payloadAction(),
        ]
        expect(lintCitationActions(actions)[0]).toContain('all-zero placeholder')
    })

    test('a real pushed commit citing this repository passes', () => {
        const actions = [
            citationAction(
                { vp: 'VP-0002', slug: 'vp-0002-account-creation', commit: REAL_COMMIT },
                SYSTEM,
            ),
            payloadAction(),
        ]
        expect(lintCitationActions(actions)).toEqual([])
    })
})

describe('prependCitation', () => {
    const ctx: BuildContext = {
        vp: 'VP-0002',
        slug: 'vp-0002-account-creation',
        commit: REAL_COMMIT,
        flags: {},
    }
    const builder: MsigBuilder = {
        entry: 1,
        citationAuth: [{ actor: 'new.vaulta', permission: 'active' }],
        build: async () => [payloadAction()],
    }

    test('the citation lands at position zero with the declared authorization', () => {
        const actions = prependCitation('vp2create', builder, ctx, [payloadAction()])
        expect(actions.length).toBe(2)
        expect(`${actions[0].account}::${actions[0].name}`).toBe('msigmessager::message')
        expect(actions[0].authorization.map(String)).toEqual(['new.vaulta@active'])
        expect(citationFromActions(actions)).toBe(citationLine(ctx))
        expect(String(actions[1].name)).toBe('buyrambytes')
    })

    test('a builder returning its own citation is refused by name', () => {
        expect(() =>
            prependCitation('vp2create', builder, ctx, [
                messageAction(citationLine(ctx)),
                payloadAction(),
            ]),
        ).toThrow(/^builder vp2create returns its own msigmessager::message action/)
    })

    test('the linter sees the assembled array', () => {
        expect(lintCitationActions(prependCitation('vp2create', builder, ctx, []))).toEqual([])
        const placeholder = prependCitation('vp2create', builder, { ...ctx, commit: COMMIT }, [])
        expect(lintCitationActions(placeholder)[0]).toContain('all-zero placeholder')
    })
})
