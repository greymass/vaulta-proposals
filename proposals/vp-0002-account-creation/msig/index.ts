import { homedir } from 'node:os'
import { join } from 'node:path'
import { ABI, Bytes, Serializer } from '@wharfkit/antelope'
import { NETWORK_AUTHORITY, networkContractActiveAuthority } from '$lib/constants'
import { eosio } from '$lib/contracts'
import type { MsigBuilder } from '$lib/types'

const ACCOUNT = 'new.vaulta'
const RAM_BYTES = 204800

const system = { actor: 'eosio', permission: 'active' }
const account = { actor: ACCOUNT, permission: 'active' }

export const msigs: Record<string, MsigBuilder> = {
    vp2create: {
        entry: 1,
        citationAuth: [system],
        build: async () => [
            eosio.action(
                'newaccount',
                {
                    creator: 'eosio',
                    name: ACCOUNT,
                    owner: NETWORK_AUTHORITY,
                    active: networkContractActiveAuthority(ACCOUNT),
                },
                { authorization: [system] },
            ),
            eosio.action(
                'buyrambytes',
                { payer: 'eosio', receiver: ACCOUNT, bytes: RAM_BYTES },
                { authorization: [system] },
            ),
        ],
    },

    vp2deploy: {
        entry: 2,
        citationAuth: [system],
        flags: {
            'build-dir': {
                description:
                    'output of `make build/production` in contracts/create at the cited commit',
                default: join(homedir(), 'projects/vaulta-contracts/contracts/create/build'),
            },
        },
        build: async (ctx) => {
            const buildDir = ctx.flags['build-dir']
            const wasm = new Uint8Array(await Bun.file(`${buildDir}/create.wasm`).arrayBuffer())
            const abi = ABI.from(JSON.parse(await Bun.file(`${buildDir}/create.abi`).text()))
            return [
                eosio.action(
                    'setcode',
                    {
                        account: ACCOUNT,
                        vmtype: 0,
                        vmversion: 0,
                        code: Bytes.from(wasm),
                    },
                    { authorization: [account] },
                ),
                eosio.action(
                    'setabi',
                    {
                        account: ACCOUNT,
                        abi: Serializer.encode({ object: abi, type: ABI }),
                    },
                    { authorization: [account] },
                ),
            ]
        },
    },
}
