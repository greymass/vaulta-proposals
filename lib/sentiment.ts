import { Name } from '@wharfkit/antelope'
import { lintCitationLine, type ParsedCitation, parseCitationLine } from './citation'
import type { SentimentRef } from './types'
import { client } from './wharf'

export interface TopicRow {
    id: string
    description: string
    creator: string
}

// A contract account that does not exist surfaces as a bare node exception naming no account.
async function readTopicRows(ref: SentimentRef) {
    try {
        return await client.v1.chain.get_table_rows({
            code: ref.contract,
            scope: ref.contract,
            table: 'topics',
            lower_bound: Name.from(ref.topic),
            upper_bound: Name.from(ref.topic),
            limit: 1,
            json: true,
        })
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error)
        throw new Error(`cannot read topics on ${ref.contract}: ${message}`)
    }
}

// The deployed sentiment contract keys `topics` by id in its own scope.
export async function fetchTopicRow(ref: SentimentRef): Promise<TopicRow> {
    const result = await readTopicRows(ref)
    const row = result.rows[0]
    if (!row) {
        throw new Error(`topic ${ref.contract}/${ref.topic} not found on-chain`)
    }
    return {
        id: String(row.id),
        description: String(row.description ?? ''),
        creator: String(row.creator),
    }
}

// VPS-1 carries a sentiment binding's citation as the first line of the topic description.
export function topicCitationLine(description: string): string {
    return description.split('\n')[0].replace(/\r$/, '')
}

// Distinguishes a description that never claimed a citation from one whose first line tried to be one.
const ATTEMPTED = /^VP-\d{4}\s/

export interface TopicCitationCheck {
    cited: boolean
    line: string
    parsed?: ParsedCitation
    problems: string[]
}

// Pure counterpart to checkCitationCommit, which asks git whether the cited commit is reachable.
export function lintTopicCitation(
    description: string,
    vp: string,
    slug: string,
): TopicCitationCheck {
    const line = topicCitationLine(description)
    const parsed = parseCitationLine(line)
    if (!parsed) {
        // An absent citation is conformant; only a line posing as one is worth reporting.
        const problems = ATTEMPTED.test(line) ? lintCitationLine(line) : []
        return { cited: false, line, problems }
    }
    const problems = lintCitationLine(line)
    if (parsed.vp !== vp) {
        problems.push(`topic cites ${parsed.vp}, but it is bound to ${vp}`)
    }
    if (parsed.slug !== slug) {
        problems.push(
            `topic cites proposals/${parsed.slug}, but this proposal is proposals/${slug}`,
        )
    }
    return { cited: true, line, parsed, problems }
}
