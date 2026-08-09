import { Name } from '@wharfkit/antelope'
import { parse } from 'yaml'
import { MSIG_STATUSES, STATUSES } from './constants'
import type { MsigRef, ProposalFrontmatter } from './types'

const VP_PATTERN = /^VP-\d{4}$/
const SLUG_PATTERN = /^vp-\d{4}-[a-z0-9-]+$/
const TXID_PATTERN = /^[0-9a-f]{64}$/
const STANDARD_PATTERN = /^VPS-\d+$/
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/

const ALLOWED_KEYS = new Set([
    'vp',
    'title',
    'standard',
    'status',
    'authors',
    'created',
    'accounts',
    'msigs',
    'sentiment',
    'requires',
    'replaces',
    'superseded-by',
    'resolution',
])

const MSIG_ENTRY_KEYS = new Set(['proposer', 'proposal', 'status', 'txid'])
const SENTIMENT_ENTRY_KEYS = new Set(['contract', 'topic'])

export function parseProposal(markdown: string): { frontmatter: unknown; body: string } {
    const match = markdown.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)
    if (!match) {
        throw new Error('document must begin with a YAML frontmatter block delimited by ---')
    }
    return { frontmatter: parse(match[1]), body: match[2] }
}

export function isAntelopeName(value: string): boolean {
    try {
        return String(Name.from(value)) === value && value.length > 0
    } catch {
        return false
    }
}

export function checkUnknownKeys(
    obj: Record<string, unknown>,
    allowed: ReadonlySet<string>,
    errors: string[],
    context: string,
): boolean {
    let ok = true
    for (const key of Object.keys(obj)) {
        if (!allowed.has(key)) {
            errors.push(`${context}: unknown key "${key}"`)
            ok = false
        }
    }
    return ok
}

function checkNameFields(
    ref: Record<string, unknown>,
    fields: string[],
    errors: string[],
    context: string,
): boolean {
    let ok = true
    for (const field of fields) {
        if (typeof ref[field] !== 'string' || !isAntelopeName(ref[field] as string)) {
            errors.push(`${context}.${field} must be an Antelope name`)
            ok = false
        }
    }
    return ok
}

function isStringArray(value: unknown): value is string[] {
    return Array.isArray(value) && value.every((item) => typeof item === 'string')
}

function isVpList(value: unknown): value is string[] {
    return isStringArray(value) && value.every((vp) => VP_PATTERN.test(vp))
}

function validateMsigs(value: unknown, errors: string[]): value is MsigRef[] {
    if (!Array.isArray(value)) {
        errors.push('msigs must be a list of {proposer, proposal, status, txid?}')
        return false
    }
    let ok = true
    value.forEach((entry, i) => {
        const ref = entry as Record<string, unknown>
        if (typeof entry !== 'object' || entry === null) {
            errors.push(`msigs[${i}] must be a mapping`)
            ok = false
            return
        }
        ok = checkNameFields(ref, ['proposer', 'proposal'], errors, `msigs[${i}]`) && ok
        if (typeof ref.status !== 'string' || !MSIG_STATUSES.includes(ref.status as never)) {
            errors.push(`msigs[${i}].status must be one of ${MSIG_STATUSES.join(', ')}`)
            ok = false
        }
        const executed = ref.status === 'executed'
        const hasTxid = typeof ref.txid === 'string' && TXID_PATTERN.test(ref.txid as string)
        if (executed && !hasTxid) {
            errors.push(`msigs[${i}]: executed entries require a 64-hex txid`)
            ok = false
        }
        if (!executed && ref.txid !== undefined) {
            errors.push(`msigs[${i}]: txid is only allowed when status is executed`)
            ok = false
        }
        ok = checkUnknownKeys(ref, MSIG_ENTRY_KEYS, errors, `msigs[${i}]`) && ok
    })
    return ok
}

function validateSentiment(value: unknown, errors: string[]): boolean {
    if (!Array.isArray(value)) {
        errors.push('sentiment must be a list of {contract, topic}')
        return false
    }
    let ok = true
    value.forEach((entry, i) => {
        const ref = entry as Record<string, unknown>
        if (typeof entry !== 'object' || entry === null) {
            errors.push(`sentiment[${i}] must be a mapping of {contract, topic}`)
            ok = false
            return
        }
        ok = checkNameFields(ref, ['contract', 'topic'], errors, `sentiment[${i}]`) && ok
        ok = checkUnknownKeys(ref, SENTIMENT_ENTRY_KEYS, errors, `sentiment[${i}]`) && ok
    })
    return ok
}

export function validateFrontmatter(
    data: unknown,
    slug: string,
): { value?: ProposalFrontmatter; errors: string[] } {
    const errors: string[] = []
    if (typeof data !== 'object' || data === null) {
        return { errors: ['frontmatter is not a mapping'] }
    }
    const fm = data as Record<string, unknown>

    checkUnknownKeys(fm, ALLOWED_KEYS, errors, 'frontmatter')

    if (typeof fm.vp !== 'string' || !VP_PATTERN.test(fm.vp)) {
        errors.push(`vp must match VP-NNNN (got ${JSON.stringify(fm.vp)})`)
    }
    if (!SLUG_PATTERN.test(slug)) {
        errors.push(`directory name must match vp-NNNN-slug (got ${slug})`)
    }
    if (typeof fm.vp === 'string' && VP_PATTERN.test(fm.vp)) {
        const number = fm.vp.slice(3)
        if (!slug.startsWith(`vp-${number}-`)) {
            errors.push(`directory ${slug} does not match frontmatter ${fm.vp}`)
        }
    }
    if (typeof fm.title !== 'string' || fm.title.length === 0) {
        errors.push('title is required')
    }
    if (typeof fm.standard !== 'string' || !STANDARD_PATTERN.test(fm.standard)) {
        errors.push('standard is required and must match VPS-N (e.g. VPS-1)')
    }
    if (typeof fm.status !== 'string' || !STATUSES.includes(fm.status as never)) {
        errors.push(`status must be one of ${STATUSES.join(', ')}`)
    }
    if (!isStringArray(fm.authors) || fm.authors.length === 0) {
        errors.push('authors must be a non-empty string list')
    }
    const created = fm.created instanceof Date ? fm.created.toISOString().slice(0, 10) : fm.created
    if (typeof created !== 'string' || !DATE_PATTERN.test(created)) {
        errors.push('created must be a YYYY-MM-DD date')
    } else {
        fm.created = created
    }
    if (!isStringArray(fm.accounts) || !fm.accounts.every(isAntelopeName)) {
        errors.push('accounts must be a list of Antelope names (may be empty)')
    }
    validateMsigs(fm.msigs, errors)
    validateSentiment(fm.sentiment, errors)
    if (!isVpList(fm.requires)) {
        errors.push('requires must be a list of VP-NNNN identifiers (may be empty)')
    }
    for (const field of ['replaces', 'superseded-by']) {
        if (fm[field] !== undefined && !isVpList(fm[field])) {
            errors.push(`${field} must be a list of VP-NNNN identifiers`)
        }
    }
    const supersededBy = fm['superseded-by'] as string[] | undefined
    if (fm.status === 'Superseded' && (!supersededBy || supersededBy.length === 0)) {
        errors.push('status Superseded requires a non-empty superseded-by list')
    }
    if (fm.status !== 'Superseded' && supersededBy !== undefined) {
        errors.push('superseded-by is only allowed when status is Superseded')
    }
    if (fm.status === 'Executed') {
        if (typeof fm.resolution !== 'string' || !TXID_PATTERN.test(fm.resolution)) {
            errors.push('status Executed requires resolution: a 64-hex txid')
        } else if (Array.isArray(fm.msigs)) {
            const executedTxids = (fm.msigs as MsigRef[])
                .filter((m) => m.status === 'executed' && m.txid)
                .map((m) => m.txid)
            if (executedTxids.length > 0 && !executedTxids.includes(fm.resolution)) {
                errors.push('resolution must match an executed msig entry txid')
            }
        }
    } else if (fm.resolution !== undefined) {
        errors.push('resolution is only allowed when status is Executed')
    }

    return errors.length ? { errors } : { value: fm as unknown as ProposalFrontmatter, errors }
}
