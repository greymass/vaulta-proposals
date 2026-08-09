import { APIClient, PermissionLevel } from '@wharfkit/antelope'
import { Chains, Session } from '@wharfkit/session'
import { WalletPluginPrivateKey } from '@wharfkit/wallet-plugin-privatekey'
import { NODEOS_API_URL, proposerKey, proposerPermission } from './constants'

export const client = new APIClient({ url: NODEOS_API_URL })

export const chain = Chains.Vaulta

export function makeProposerSession(): Session {
    return new Session({
        chain,
        permissionLevel: proposerPermission(),
        walletPlugin: new WalletPluginPrivateKey(proposerKey()),
    })
}

interface GetProducersRow {
    owner: string
    total_votes: string
    is_active: boolean | number
}

interface GetProducersResponse {
    rows: GetProducersRow[]
}

export async function getTopProducers(count = 21): Promise<PermissionLevel[]> {
    const result = await client.call<GetProducersResponse>({
        path: '/v1/chain/get_producers',
        params: { json: true, limit: 200 },
    })
    const active = result.rows
        .filter((row) => Boolean(row.is_active) || Number(row.is_active) === 1)
        .sort((a, b) => Number(b.total_votes) - Number(a.total_votes))
        .slice(0, count)
    return active.map((row) => PermissionLevel.from(`${row.owner}@active`))
}
