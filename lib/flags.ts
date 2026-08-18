import { ZERO_COMMIT } from './constants'
import type { MsigFlag } from './types'

export const COMMIT_FLAG = 'commit'

// Declared by the tooling rather than by a builder, since every citation needs it.
export const SHARED_FLAGS: Record<string, MsigFlag> = {
    [COMMIT_FLAG]: {
        description: 'commit of the proposal text the citation pins',
        default: ZERO_COMMIT,
    },
}

const VALUELESS = new Set(['broadcast', 'help'])

export type FlagSource = 'flag' | 'environment' | 'default'

export interface ParsedArgs {
    positionals: string[]
    flags: Record<string, string>
    switches: Set<string>
    errors: string[]
}

export function parseArgs(argv: string[]): ParsedArgs {
    const positionals: string[] = []
    const flags: Record<string, string> = {}
    const switches = new Set<string>()
    const errors: string[] = []
    for (let i = 0; i < argv.length; i++) {
        const token = argv[i]
        if (!token.startsWith('--')) {
            positionals.push(token)
            continue
        }
        const body = token.slice(2)
        const eq = body.indexOf('=')
        const name = eq === -1 ? body : body.slice(0, eq)
        if (VALUELESS.has(name)) {
            switches.add(name)
            continue
        }
        if (eq !== -1) {
            flags[name] = body.slice(eq + 1)
            continue
        }
        const value = argv[i + 1]
        if (value === undefined || value.startsWith('--')) {
            errors.push(`--${name} needs a value`)
            continue
        }
        flags[name] = value
        i++
    }
    return { positionals, flags, switches, errors }
}

// VP_BUILD_DIR for a flag named build-dir. Stated in CONTRIBUTING.md and printed by --help.
export function flagEnvName(name: string): string {
    return `VP_${name.toUpperCase().replace(/-/g, '_')}`
}

export interface ResolvedFlag {
    value: string
    source: FlagSource
}

export function declaredFlags(builderFlags?: Record<string, MsigFlag>): Record<string, MsigFlag> {
    return { ...SHARED_FLAGS, ...builderFlags }
}

export function unknownFlags(
    declared: Record<string, MsigFlag>,
    supplied: Record<string, string>,
): string[] {
    return Object.keys(supplied).filter((name) => !(name in declared))
}

export function resolveFlags(
    declared: Record<string, MsigFlag>,
    supplied: Record<string, string>,
    env: Record<string, string | undefined> = process.env,
): { resolved: Record<string, ResolvedFlag>; errors: string[] } {
    const resolved: Record<string, ResolvedFlag> = {}
    const errors: string[] = []
    for (const [name, flag] of Object.entries(declared)) {
        const fromFlag = supplied[name]
        const fromEnv = env[flagEnvName(name)]
        if (fromFlag !== undefined) {
            resolved[name] = { value: fromFlag, source: 'flag' }
        } else if (fromEnv !== undefined && fromEnv !== '') {
            resolved[name] = { value: fromEnv, source: 'environment' }
        } else if (flag.default !== undefined) {
            resolved[name] = { value: flag.default, source: 'default' }
        } else {
            errors.push(
                `${name} has no value: pass --${name} <value> or set ${flagEnvName(name)} (${flag.description})`,
            )
        }
    }
    return { resolved, errors }
}

export function sourceLabel(name: string, source: FlagSource): string {
    return source === 'environment' ? `environment ${flagEnvName(name)}` : source
}

export function flagValues(resolved: Record<string, ResolvedFlag>): Record<string, string> {
    return Object.fromEntries(Object.entries(resolved).map(([name, r]) => [name, r.value]))
}
