import { describe, expect, it, test } from 'bun:test'
import { ZERO_COMMIT } from '$lib/constants'
import {
    COMMIT_FLAG,
    declaredFlags,
    flagEnvName,
    flagValues,
    parseArgs,
    resolveFlags,
    sourceLabel,
    unknownFlags,
} from '$lib/flags'
import type { MsigFlag } from '$lib/types'

const buildDir: Record<string, MsigFlag> = {
    'build-dir': { description: 'contract build output', default: '/tmp/build' },
}
const required: Record<string, MsigFlag> = {
    'wasm-path': { description: 'path to the wasm' },
}

describe('parseArgs', () => {
    test('splits positionals from flags', () => {
        const args = parseArgs(['VP-0002', 'vp2create', '--commit', 'abc'])
        expect(args.positionals).toEqual(['VP-0002', 'vp2create'])
        expect(args.flags).toEqual({ commit: 'abc' })
        expect(args.errors).toEqual([])
    })
    test('a flag value is never taken as a positional', () => {
        const args = parseArgs(['--commit', 'abc', 'VP-0002', 'vp2create'])
        expect(args.positionals).toEqual(['VP-0002', 'vp2create'])
    })
    test('accepts the --name=value form', () => {
        expect(parseArgs(['--build-dir=/tmp/x']).flags).toEqual({ 'build-dir': '/tmp/x' })
    })
    test('broadcast and help take no value', () => {
        const args = parseArgs(['VP-0002', 'vp2create', '--broadcast', '--help'])
        expect(args.switches.has('broadcast')).toBe(true)
        expect(args.switches.has('help')).toBe(true)
        expect(args.positionals).toEqual(['VP-0002', 'vp2create'])
    })
    test('a flag with no value is an error', () => {
        expect(parseArgs(['--commit']).errors.join(' ')).toContain('--commit needs a value')
        expect(parseArgs(['--commit', '--broadcast']).errors.join(' ')).toContain('needs a value')
    })
})

describe('flagEnvName', () => {
    test('uppercases and underscores under a VP_ prefix', () => {
        expect(flagEnvName('commit')).toBe('VP_COMMIT')
        expect(flagEnvName('build-dir')).toBe('VP_BUILD_DIR')
    })
})

describe('declaredFlags', () => {
    test('every builder gets the shared commit flag', () => {
        expect(Object.keys(declaredFlags())).toEqual([COMMIT_FLAG])
        expect(declaredFlags()[COMMIT_FLAG].default).toBe(ZERO_COMMIT)
    })
    test('a builder adds its own', () => {
        expect(Object.keys(declaredFlags(buildDir))).toEqual([COMMIT_FLAG, 'build-dir'])
    })
})

describe('unknownFlags', () => {
    test('names a flag the builder does not declare', () => {
        expect(
            unknownFlags(declaredFlags(buildDir), { 'build-dir': '/x', 'wasm-dir': '/y' }),
        ).toEqual(['wasm-dir'])
    })
})

describe('resolveFlags', () => {
    it('prefers a flag over the environment and the environment over the default', () => {
        const env = { VP_BUILD_DIR: '/from/env' }
        const flag = resolveFlags(buildDir, { 'build-dir': '/from/flag' }, env)
        expect(flag.resolved['build-dir']).toEqual({ value: '/from/flag', source: 'flag' })
        const environment = resolveFlags(buildDir, {}, env)
        expect(environment.resolved['build-dir']).toEqual({
            value: '/from/env',
            source: 'environment',
        })
        const fallback = resolveFlags(buildDir, {}, {})
        expect(fallback.resolved['build-dir']).toEqual({ value: '/tmp/build', source: 'default' })
    })

    it('treats an empty environment value as unset', () => {
        const { resolved } = resolveFlags(buildDir, {}, { VP_BUILD_DIR: '' })
        expect(resolved['build-dir'].source).toBe('default')
    })

    it('reports a flag that has no value and no default', () => {
        const { errors } = resolveFlags(required, {}, {})
        expect(errors.join(' ')).toContain('wasm-path has no value')
        expect(errors.join(' ')).toContain('VP_WASM_PATH')
    })

    it('resolves a required flag from the environment', () => {
        const { resolved, errors } = resolveFlags(
            required,
            {},
            { VP_WASM_PATH: '/tmp/create.wasm' },
        )
        expect(errors).toEqual([])
        expect(resolved['wasm-path'].value).toBe('/tmp/create.wasm')
    })

    it('defaults the shared commit to the all-zero placeholder', () => {
        const { resolved } = resolveFlags(declaredFlags(), {}, {})
        expect(resolved[COMMIT_FLAG]).toEqual({ value: ZERO_COMMIT, source: 'default' })
    })
})

describe('sourceLabel', () => {
    test('an environment source names the variable it came from', () => {
        expect(sourceLabel('build-dir', 'environment')).toBe('environment VP_BUILD_DIR')
        expect(sourceLabel('build-dir', 'flag')).toBe('flag')
        expect(sourceLabel('build-dir', 'default')).toBe('default')
    })
})

describe('flagValues', () => {
    test('drops the source and keeps the value', () => {
        const { resolved } = resolveFlags(buildDir, {}, {})
        expect(flagValues(resolved)).toEqual({ 'build-dir': '/tmp/build' })
    })
})
