import { createHash } from 'node:crypto'
import { homedir } from 'node:os'
import { join } from 'node:path'
import { ABI, Action, Authority, Bytes, Serializer } from '@wharfkit/antelope'
import { NETWORK_AUTHORITY, networkContractActiveAuthority } from '$lib/constants'
import { eosio } from '$lib/contracts'
import type { MsigBuilder } from '$lib/types'

const ACCOUNT = 'gift.vaulta'
const RAM_BYTES = 4096
const SEED_ACCOUNT = 'admin.grants'
const SEED_BYTES = 1_000_000_000

const GIFT_WASM_SHA256 = '27ed7ecee18f1a81ec7e9ed4aeacdd76de6e1431f66eb62d363067480ddd3072'
const GIFT_ABI_SHA256 = '4f39f95e9c4d7d0efb65407ea599f4336656b5075d3d72b3447289b8107590ab'

const system = { actor: 'eosio', permission: 'active' }
const account = { actor: ACCOUNT, permission: 'active' }

function sha256(bytes: Uint8Array): string {
    return createHash('sha256').update(bytes).digest('hex')
}

function producers(permission: string): Authority {
    return Authority.from({
        threshold: 1,
        keys: [],
        accounts: [{ weight: 1, permission: { actor: 'eosio.prods', permission } }],
        waits: [],
    })
}

function child(permission: string, producerPermission: string, actions: string[]): Action[] {
    return [
        eosio.action(
            'updateauth',
            {
                account: ACCOUNT,
                permission,
                parent: 'active',
                auth: producers(producerPermission),
            },
            { authorization: [account] },
        ),
        ...actions.map((type) =>
            eosio.action(
                'linkauth',
                { account: ACCOUNT, code: ACCOUNT, type, requirement: permission },
                { authorization: [account] },
            ),
        ),
    ]
}

export const msigs: Record<string, MsigBuilder> = {
    vp1create: {
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

    vp1deploy: {
        entry: 2,
        citationAuth: [system],
        flags: {
            'build-dir': {
                description:
                    'output of `make build/gift/production` in vaulta-contracts at the pinned commit',
                default: join(homedir(), 'projects/vaulta-contracts/contracts/gift/build'),
            },
        },
        build: async (ctx) => {
            const buildDir = ctx.flags['build-dir']
            const wasm = new Uint8Array(await Bun.file(`${buildDir}/gift.wasm`).arrayBuffer())
            const abi = ABI.from(JSON.parse(await Bun.file(`${buildDir}/gift.abi`).text()))
            const abiBytes = Serializer.encode({ object: abi, type: ABI })
            if (sha256(wasm) !== GIFT_WASM_SHA256) {
                throw new Error(`${buildDir}/gift.wasm is not the pinned build ${GIFT_WASM_SHA256}`)
            }
            // VP-0004's eosio.assert guard pins this hash of the encoded ABI, not of gift.abi.
            if (sha256(abiBytes.array) !== GIFT_ABI_SHA256) {
                throw new Error(`${buildDir}/gift.abi is not the pinned build ${GIFT_ABI_SHA256}`)
            }
            return [
                eosio.action(
                    'ramtransfer',
                    {
                        from: SEED_ACCOUNT,
                        to: ACCOUNT,
                        bytes: SEED_BYTES,
                        memo: 'VP-0001 endowment seed',
                    },
                    { authorization: [{ actor: SEED_ACCOUNT, permission: 'active' }] },
                ),
                ...child('halt', 'prod.major', ['disable', 'resume']),
                ...child('suspend', 'prod.minor', ['suspend']),
                eosio.action(
                    'limitauthchg',
                    { account: ACCOUNT, allow_perms: ['owner', 'active'], disallow_perms: [] },
                    { authorization: [account] },
                ),
                eosio.action(
                    'setcode',
                    { account: ACCOUNT, vmtype: 0, vmversion: 0, code: Bytes.from(wasm) },
                    { authorization: [account] },
                ),
                eosio.action(
                    'setabi',
                    { account: ACCOUNT, abi: abiBytes },
                    { authorization: [account] },
                ),
                Action.from(
                    { account: ACCOUNT, name: 'enable', authorization: [account], data: {} },
                    abi,
                ),
            ]
        },
    },
}
