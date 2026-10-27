import { createHash } from 'node:crypto'
import { ABI, type NameType, Serializer, UInt64 } from '@wharfkit/antelope'
import assertAbiJson from '$lib/codegen/eosio.assert.abi.json'
import { client } from './wharf'

export const ASSERT_CONTRACT = 'eosio.assert'
export const assertAbi = ABI.from(assertAbiJson)

export interface GuardManifest {
    account: NameType
    domain: string
    appmeta: string
    whitelist: { contract: NameType; action: NameType }[]
}

export interface ManifestAction {
    account: string
    name: string
    authorization: { actor: string; permission: string }[]
    data: Record<string, unknown>
}

// eosio.assert names a manifest by the sha256 of its packed add.manifest data.
export function manifestId(manifest: GuardManifest): string {
    const data = Serializer.encode({ object: manifest, abi: assertAbi, type: 'add_manifest' })
    return createHash('sha256').update(data.array).digest('hex')
}

export function addManifestAction(manifest: GuardManifest): ManifestAction {
    const data = Serializer.objectify(
        Serializer.decode({
            data: Serializer.encode({ object: manifest, abi: assertAbi, type: 'add_manifest' }),
            abi: assertAbi,
            type: 'add_manifest',
        }),
    )
    return {
        account: ASSERT_CONTRACT,
        name: 'add.manifest',
        authorization: [{ actor: String(data.account), permission: 'active' }],
        data,
    }
}

export function delManifestAction(manifest: GuardManifest): ManifestAction {
    const action = addManifestAction(manifest)
    return {
        ...action,
        name: 'del.manifest',
        data: { id: manifestId(manifest) },
    }
}

export async function findManifest(id: string): Promise<{ unique_id: number } | undefined> {
    let lower: UInt64 | undefined
    for (;;) {
        const result = await client.v1.chain.get_table_rows({
            code: ASSERT_CONTRACT,
            scope: ASSERT_CONTRACT,
            table: 'manifests',
            json: true,
            limit: 500,
            lower_bound: lower,
        })
        const found = result.rows.find((row: { id: string }) => row.id === id)
        if (found) return found
        if (!result.more) return undefined
        lower = UInt64.from(result.next_key)
    }
}
