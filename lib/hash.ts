import { createHash } from 'node:crypto'
import { type Action, Serializer } from '@wharfkit/antelope'

function sortKeys(value: unknown): unknown {
    if (Array.isArray(value)) return value.map(sortKeys)
    if (value !== null && typeof value === 'object') {
        const sorted: Record<string, unknown> = {}
        for (const key of Object.keys(value as Record<string, unknown>).sort()) {
            sorted[key] = sortKeys((value as Record<string, unknown>)[key])
        }
        return sorted
    }
    return value
}

// Python's json.dumps escapes every non-ASCII code unit where JSON.stringify emits it raw.
function escapeNonAscii(json: string): string {
    return json.replace(
        /[\u0080-\uffff]/g,
        (char) => `\\u${char.charCodeAt(0).toString(16).padStart(4, '0')}`,
    )
}

// Byte-for-byte what `json.dumps(value, indent=1, sort_keys=True)` and `print` write.
export function canonicalJson(value: unknown): string {
    return `${escapeNonAscii(JSON.stringify(sortKeys(value), null, 1))}\n`
}

export function canonicalActionsJson(actions: Action[]): string {
    return canonicalJson(Serializer.objectify(actions))
}

export function hashActions(actions: Action[]): string {
    return createHash('sha256').update(canonicalActionsJson(actions), 'utf8').digest('hex')
}
