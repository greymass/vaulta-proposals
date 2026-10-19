import { parseArgs } from '$lib/flags'
import {
    addManifestAction,
    delManifestAction,
    findManifest,
    type GuardManifest,
    manifestId,
} from '$lib/manifest'
import { loadMsigModule, resolveSlug } from '$lib/msig'

const USAGE = 'usage: bun run manifest <vp> [add|del]'

const args = parseArgs(process.argv.slice(2))
const [vpArg, mode = 'add'] = args.positionals

if (args.errors.length || !vpArg || (mode !== 'add' && mode !== 'del')) {
    for (const error of args.errors) console.error(error)
    console.error(USAGE)
    process.exit(1)
}

let slug: string
let manifest: GuardManifest
try {
    slug = resolveSlug(vpArg)
    const module = (await loadMsigModule(slug)) as { GUARD_MANIFEST?: GuardManifest }
    if (!module.GUARD_MANIFEST) {
        throw new Error(`proposals/${slug}/msig/index.ts exports no GUARD_MANIFEST`)
    }
    manifest = module.GUARD_MANIFEST
} catch (error) {
    console.error(error instanceof Error ? error.message : String(error))
    process.exit(1)
}

const id = manifestId(manifest)
const action = mode === 'del' ? delManifestAction(manifest) : addManifestAction(manifest)
const onchain = await findManifest(id)

console.log(`manifest ${slug} :: ${id}`)
console.log(
    onchain ? `registered on-chain as unique_id ${onchain.unique_id}` : 'not registered on-chain',
)
console.log(JSON.stringify(action, null, 4))
