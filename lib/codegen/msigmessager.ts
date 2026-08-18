import type {Action} from '@wharfkit/antelope'
import {ABI, Blob, Name, Struct} from '@wharfkit/antelope'
import type {ActionOptions, ContractArgs, PartialBy, Table} from '@wharfkit/contract'
import {Contract as BaseContract} from '@wharfkit/contract'
export const abiBlob = Blob.from(
    'DmVvc2lvOjphYmkvMS4yAAEHbWVzc2FnZQABB21lc3NhZ2UGc3RyaW5nAQAAAEAxg7GSB21lc3NhZ2UAAAAAAAAA'
)
export const abi = ABI.from(abiBlob)
export namespace Types {
    @Struct.type('message')
    export class message extends Struct {
        @Struct.field('string')
        declare message: string
    }
}
export const TableMap = {}
export interface TableTypes {}
export type RowType<T> = T extends keyof TableTypes ? TableTypes[T] : any
export type TableNames = keyof TableTypes
export namespace ActionParams {
    export namespace Type {}
    export interface message {
        message: string
    }
}
export interface ActionNameParams {
    message: ActionParams.message
}
export type ActionNames = keyof ActionNameParams
export class Contract extends BaseContract {
    constructor(args: PartialBy<ContractArgs, 'abi' | 'account'>) {
        super({
            client: args.client,
            abi: abi,
            account: args.account || Name.from('msigmessager'),
        })
    }
    action<T extends ActionNames>(
        name: T,
        data: ActionNameParams[T],
        options?: ActionOptions
    ): Action {
        return super.action(name, data, options)
    }
}
