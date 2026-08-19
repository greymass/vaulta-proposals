import { Contract as EosioContract } from './codegen/eosio'
import { Contract as MsigmessagerContract } from './codegen/msigmessager'
import { client } from './wharf'

export const eosio = new EosioContract({ client })

export const msigmessager = new MsigmessagerContract({ client })
