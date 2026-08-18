import { execFileSync } from 'node:child_process'
import { type Action, type PermissionLevelType, Serializer } from '@wharfkit/antelope'
import { abi as msigmessagerAbi } from './codegen/msigmessager'
import { PROPOSAL_REPO, ROOT, ZERO_COMMIT } from './constants'
import { msigmessager } from './contracts'
import type { BuildContext, MsigBuilder } from './types'

const VP_PATTERN = /^VP-\d{4}$/
export const COMMIT_PATTERN = /^[0-9a-f]{40}$/

export interface CitationRef {
    vp: string
    slug: string
    commit: string
}

// Shape fixed by the VPS-1 back-reference rule, including the `proposals/` path segment.
export function citationLine({ vp, slug, commit }: CitationRef): string {
    if (!VP_PATTERN.test(vp)) {
        throw new Error(`citation vp must be VP-NNNN, got ${vp}`)
    }
    if (!slug.startsWith(`${vp.toLowerCase()}-`) || slug.length === vp.length + 1) {
        throw new Error(`citation slug ${slug} does not carry the VP number of ${vp}`)
    }
    if (!COMMIT_PATTERN.test(commit)) {
        throw new Error(`citation commit must be a full 40-hex sha, got ${commit}`)
    }
    return `${vp} https://github.com/${PROPOSAL_REPO}/blob/${commit}/proposals/${slug}/proposal.md`
}

export function citationAction(ref: CitationRef, authorization: PermissionLevelType[]): Action {
    return msigmessager.action('message', { message: citationLine(ref) }, { authorization })
}

const CITATION_ACCOUNT = 'msigmessager'
const CITATION_ACTION = 'message'

export function isCitationAction(action: Action): boolean {
    return String(action.account) === CITATION_ACCOUNT && String(action.name) === CITATION_ACTION
}

// The one place a transaction's action zero is assembled, so `propose` and `verify` cannot disagree.
export function prependCitation(
    name: string,
    builder: MsigBuilder,
    ctx: BuildContext,
    actions: Action[],
): Action[] {
    if (actions.some(isCitationAction)) {
        throw new Error(
            `builder ${name} returns its own ${CITATION_ACCOUNT}::${CITATION_ACTION} action; remove it, the citation is prepended from \`citationAuth\``,
        )
    }
    const ref = { vp: ctx.vp, slug: ctx.slug, commit: ctx.commit }
    return [citationAction(ref, builder.citationAuth), ...actions]
}

// Mirrors citationLine, including the `proposals/` path segment VPS-1 requires.
const CITATION_PATTERN =
    /^(VP-\d{4}) https:\/\/github\.com\/([^/\s]+)\/([^/\s]+)\/blob\/([^/\s]+)\/proposals\/([^/\s]+)\/proposal\.md$/

export interface ParsedCitation {
    vp: string
    org: string
    repo: string
    commit: string
    slug: string
}

export function parseCitationLine(line: string): ParsedCitation | undefined {
    const match = CITATION_PATTERN.exec(line)
    if (!match) return undefined
    const [, vp, org, repo, commit, slug] = match
    return { vp, org, repo, commit, slug }
}

// Accepts the SSH and HTTPS forms git writes for a GitHub remote; lowercased because GitHub resolves owner and repository without regard to case.
export function parseRemoteRepo(url: string): string | undefined {
    const trimmed = url
        .trim()
        .replace(/\/+$/, '')
        .replace(/\.git$/, '')
    const match =
        /^git@github\.com:([^/\s]+)\/([^/\s]+)$/.exec(trimmed) ??
        /^(?:https|ssh):\/\/(?:[^@/\s]+@)?github\.com\/([^/\s]+)\/([^/\s]+)$/.exec(trimmed)
    if (!match) return undefined
    return `${match[1]}/${match[2]}`.toLowerCase()
}

export interface Remote {
    name: string
    url: string
}

// The remote's name carries no authority; identity does, so a fork's `origin` is as valid as `upstream`.
export function selectCanonicalRemote(
    remotes: Remote[],
    canonical = PROPOSAL_REPO,
): Remote | undefined {
    const target = canonical.toLowerCase()
    const matches = remotes.filter((remote) => parseRemoteRepo(remote.url) === target)
    return matches.find((remote) => remote.name === 'origin') ?? matches[0]
}

// Undefined means no citation, which VPS-1 permits.
export function citationFromActions(actions: Action[]): string | undefined {
    const first = actions[0]
    if (!first || !isCitationAction(first)) return undefined
    const decoded = Serializer.decode({
        data: first.data,
        abi: msigmessagerAbi,
        type: CITATION_ACTION,
    })
    return String(Serializer.objectify(decoded).message)
}

export function lintCitationLine(line: string, expectedRepo = PROPOSAL_REPO): string[] {
    const problems: string[] = []
    const parsed = parseCitationLine(line)
    if (!parsed) {
        problems.push(
            `citation line does not match the VPS-1 back-reference form \`VP-NNNN https://github.com/{org}/{repo}/blob/<40-hex-sha>/proposals/vp-NNNN-slug/proposal.md\`: ${line}`,
        )
        return problems
    }
    const { vp, org, repo, commit, slug } = parsed
    if (commit === ZERO_COMMIT) {
        problems.push(
            'citation commit is the all-zero placeholder; cite the pushed commit carrying this proposal',
        )
    } else if (!COMMIT_PATTERN.test(commit)) {
        problems.push(`citation commit is not a 40-character lowercase hex sha: ${commit}`)
    }
    if (!slug.startsWith(`${vp.toLowerCase()}-`)) {
        problems.push(`citation says ${vp} but its URL path names ${slug}`)
    }
    const cited = `${org}/${repo}`
    if (cited !== expectedRepo) {
        problems.push(`citation names ${cited}, but the canonical repository is ${expectedRepo}`)
    }
    return problems
}

function gitOut(args: string[]): string | undefined {
    try {
        return execFileSync('git', args, {
            cwd: ROOT,
            encoding: 'utf8',
            stdio: ['ignore', 'pipe', 'ignore'],
        })
    } catch {
        return undefined
    }
}

// `git remote -v` prints a fetch and a push line per remote, sorted by name.
export function gitRemotes(): Remote[] {
    const output = gitOut(['remote', '-v'])
    if (output === undefined) return []
    const remotes: Remote[] = []
    for (const line of output.split('\n')) {
        const match = /^(\S+)\s+(\S+)\s+\(fetch\)$/.exec(line.trim())
        if (match) remotes.push({ name: match[1], url: match[2] })
    }
    return remotes
}

function git(args: string[]): { ok: boolean; status: number } {
    try {
        execFileSync('git', args, {
            cwd: ROOT,
            encoding: 'utf8',
            stdio: ['ignore', 'ignore', 'ignore'],
        })
        return { ok: true, status: 0 }
    } catch (error) {
        const status = (error as { status?: number }).status
        return { ok: false, status: typeof status === 'number' ? status : -1 }
    }
}

// Impure counterpart to lintCitationLine: asks git whether the cited commit is really reachable.
export function checkCitationCommit(parsed: ParsedCitation): string[] {
    const { commit, slug } = parsed
    if (commit === ZERO_COMMIT) return []
    if (!COMMIT_PATTERN.test(commit)) return []
    const remote = selectCanonicalRemote(gitRemotes())
    if (!remote) {
        return [
            `citation commit ${commit} cannot be verified: no remote in this repository points at ${PROPOSAL_REPO}; add one under any name with \`git remote add upstream git@github.com:${PROPOSAL_REPO}.git\``,
        ]
    }
    const masterRef = `${remote.name}/master`
    if (!git(['rev-parse', '--verify', '--quiet', `${masterRef}^{commit}`]).ok) {
        return [
            `citation commit ${commit} cannot be verified: this repository has no ${masterRef} ref; \`git fetch ${remote.name}\` may resolve it`,
        ]
    }
    const problems: string[] = []
    const ancestor = git(['merge-base', '--is-ancestor', commit, masterRef])
    if (!ancestor.ok) {
        problems.push(
            ancestor.status === 1
                ? `citation commit ${commit} is not on ${masterRef}, which is ${PROPOSAL_REPO}; push it and \`git fetch ${remote.name}\` before citing it`
                : `citation commit ${commit} cannot be verified against ${masterRef}; \`git fetch ${remote.name}\` may resolve it`,
        )
        return problems
    }
    const path = `proposals/${slug}/proposal.md`
    if (!git(['cat-file', '-e', `${commit}:${path}`]).ok) {
        problems.push(`citation commit ${commit} does not carry ${path}`)
    }
    return problems
}

export function checkCitationActions(actions: Action[]): string[] {
    const line = citationFromActions(actions)
    if (line === undefined) return []
    const parsed = parseCitationLine(line)
    if (!parsed) return []
    return checkCitationCommit(parsed)
}

// Validates the built actions, so every proposal is covered without opting in.
export function lintCitationActions(actions: Action[], expectedRepo = PROPOSAL_REPO): string[] {
    const line = citationFromActions(actions)
    if (line === undefined) return []
    return lintCitationLine(line, expectedRepo)
}
