export interface ScannedLine {
    line: string
    marker: boolean
    fenced: boolean // state after processing this line: an opening marker is fenced, a closing one is not
}

const FENCE = /^ {0,3}(`{3,}|~{3,})(.*)$/

// A closing fence must use the same character, be at least as long as the opener, and carry no info string.
function closes(open: { char: string; len: number }, seq: string, info: string): boolean {
    return seq[0] === open.char && seq.length >= open.len && info.trim() === ''
}

export function* scanLines(body: string): Generator<ScannedLine> {
    let open: { char: string; len: number } | null = null
    for (const line of body.split('\n')) {
        const m = line.match(FENCE)
        let marker = false
        if (m) {
            const seq = m[1]
            const info = m[2]
            if (open) {
                if (closes(open, seq, info)) {
                    open = null
                    marker = true
                }
            } else if (!(seq[0] === '`' && info.includes('`'))) {
                // Backtick fences may not carry a backtick in the info string; that is inline code, not a fence.
                open = { char: seq[0], len: seq.length }
                marker = true
            }
        }
        yield { line, marker, fenced: open !== null }
    }
}

// A code fence left open at end of document desyncs every consumer of scanLines, so fail loudly.
export function lintFences(body: string): string[] {
    let last: ScannedLine | undefined
    for (const scanned of scanLines(body)) last = scanned
    return last?.fenced ? ['unterminated code fence: a ``` or ~~~ block is never closed'] : []
}

const LIST_ITEM = /^ {0,3}(?:[-*+]|\d{1,9}[.)])(?:[ \t]|$)/

// An indented chunk is code only after a blank line outside any open list item; ambiguous text stays visible to the lints.
export function stripCode(body: string): string {
    const out: string[] = []
    let blank = true
    let listOpen = false
    let indented = false
    for (const { line, marker, fenced } of scanLines(body)) {
        if (marker || fenced) {
            indented = false
            blank = false
            continue
        }
        if (line.trim() === '') {
            blank = true
            out.push(line)
            continue
        }
        const indent = line.length - line.trimStart().length
        if (indent >= 4 && (indented || (blank && !listOpen))) {
            indented = true
            continue
        }
        indented = false
        blank = false
        if (LIST_ITEM.test(line)) listOpen = true
        else if (indent === 0) listOpen = false
        out.push(line.replace(/`[^`]*`/g, ''))
    }
    return out.join('\n')
}

const RAW_HTML = /<(?:[a-zA-Z][\w:-]*|\/[a-zA-Z][\w:-]*|![a-zA-Z-]|!--)/

// Proposal bodies are plain markdown; raw HTML is a rendering-injection vector, so reject any tag-shaped token outside code.
export function lintRawHtml(body: string): string[] {
    const match = stripCode(body).match(RAW_HTML)
    return match ? [`raw HTML is not allowed in proposal bodies: found "${match[0]}"`] : []
}
