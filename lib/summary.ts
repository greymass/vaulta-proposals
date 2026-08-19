import { createHash } from 'node:crypto'
import { ABI, type Action, Serializer } from '@wharfkit/antelope'
import { abi as eosioAbi } from './codegen/eosio'
import { abi as msigmessagerAbi } from './codegen/msigmessager'

// Checked-in ABIs only, so a summary reads the same with no network as with one.
const KNOWN_ABIS: Record<string, ABI> = {
    eosio: ABI.from(eosioAbi),
    msigmessager: ABI.from(msigmessagerAbi),
}

const HEX_FIELD_LIMIT = 128
const HEX_PATTERN = /^(?:[0-9a-f]{2})+$/

// Over the bytes the hex encodes, so the value equals get_code_hash and the artifact's shasum.
function elideHex(hex: string): string {
    const bytes = Buffer.from(hex, 'hex')
    const digest = createHash('sha256').update(bytes).digest('hex')
    return `<${bytes.length} bytes, sha256 ${digest}>`
}

// A setcode wasm decodes to one hex field longer than the dump the summary replaces.
function abbreviateHex(value: unknown): unknown {
    if (Array.isArray(value)) return value.map(abbreviateHex)
    if (typeof value === 'string') {
        if (value.length <= HEX_FIELD_LIMIT || !HEX_PATTERN.test(value)) return value
        return elideHex(value)
    }
    if (value !== null && typeof value === 'object') {
        return Object.fromEntries(
            Object.entries(value as Record<string, unknown>).map(([key, inner]) => [
                key,
                abbreviateHex(inner),
            ]),
        )
    }
    return value
}

function decodeData(action: Action): string {
    const abi = KNOWN_ABIS[String(action.account)]
    const bytes = action.data.array.length
    if (!abi) return `<${bytes} bytes>`
    try {
        const decoded = Serializer.decode({
            data: action.data,
            abi,
            type: String(action.name),
        })
        return JSON.stringify(abbreviateHex(Serializer.objectify(decoded)), null, 4)
    } catch {
        return `<${bytes} bytes>`
    }
}

export function summarizeActions(actions: Action[]): string[] {
    return actions.map((action, index) => {
        const auth = action.authorization
            .map((level) => `${level.actor}@${level.permission}`)
            .join(', ')
        const data = decodeData(action)
            .split('\n')
            .map((line) => `    ${line}`)
            .join('\n')
        return `${index + 1}. ${action.account}::${action.name}  ${auth}\n${data}`
    })
}
