import type { Action } from '@wharfkit/antelope'

export const STATUSES = [
    'Draft',
    'Review',
    'Proposed',
    'Executed',
    'Rejected',
    'Withdrawn',
    'Superseded',
] as const
export type ProposalStatus = (typeof STATUSES)[number]

export const MSIG_STATUSES = ['active', 'expired', 'executed', 'cancelled'] as const
export type MsigStatus = (typeof MSIG_STATUSES)[number]

export const REQUIRED_LANGS = ['ko', 'zh'] as const

export const LANG_LABELS: Record<string, string> = {
    en: 'English',
    ko: '한국어',
    zh: '中文',
}

export interface MsigRef {
    proposer: string
    proposal: string
    status: MsigStatus
    txid?: string // 64-hex, present exactly when status === 'executed'
}

export interface SentimentRef {
    contract: string
    topic: string
}

export interface RevisionEntry {
    version: number
    date: string // YYYY-MM-DD
    summary: string
}

export interface ProposalFrontmatter {
    vp: string // "VP-0001"
    title: string
    standard: string // "VPS-1"
    status: ProposalStatus
    authors: string[]
    created: string // YYYY-MM-DD
    accounts: string[]
    msigs: MsigRef[]
    sentiment: SentimentRef[]
    requires: string[] // "VP-NNNN"
    replaces?: string[] // "VP-NNNN"
    'superseded-by'?: string[] // "VP-NNNN", non-empty iff status Superseded
    resolution?: string // 64-hex txid, required iff status Executed
    excerpt?: string
    revisions?: RevisionEntry[]
}

export interface TranslationFrontmatter {
    lang: string // must match filename tag
    source: string // 40-hex git blob hash of the English source
    translator?: string
    excerpt?: string
    revisions?: RevisionEntry[]
}

export interface TranslationEntry {
    lang: string
    path: string
    current: boolean
    title: string
    excerpt: string
}

export interface IndexEntry extends ProposalFrontmatter {
    slug: string
    path: string
    updated: string | null // git-derived last-modified date for the proposal dir
    excerpt: string
    translations: TranslationEntry[]
}

export type MsigBuilder = () => Promise<Action[]>

export interface MsigModule {
    msigs: Record<string, MsigBuilder>
}
