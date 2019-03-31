import {
    ChainPriority,
    RpcServerProtocol,
    RpcServerStatus,
} from './stateTypes';

export enum ChainsActionType {
    SetChain = 'CHAINS_SET_CHAIN',
    RemoveChain = 'CHAINS_REMOVE_CHAIN',
    AddRpcServer = 'CHAINS_ADD_RPC_SERVER',
    RemoveRpcServer = 'CHAINS_REMOVE_RPC_SERVER',
    SetRpcServerStatus = 'CHAINS_SET_RPC_SERVER_STATUS',
}

export type ChainsAction =
    | SetChainAction
    | RemoveChainAction
    | AddRpcServerAction
    | RemoveRpcServerAction
    | SetRpcServerStatusAction;

export interface SetChainAction {
    readonly type: ChainsActionType.SetChain;
    readonly chainId: string;
    readonly displayName: string;
    readonly contractName: string;
    readonly priority: ChainPriority;
}

export interface RemoveChainAction {
    readonly type: ChainsActionType.RemoveChain;
    readonly chainId: string;
}

export interface BaseServerAction {
    readonly protocol: RpcServerProtocol;
    readonly host: string;
    readonly port: number;
}

export interface AddRpcServerAction extends BaseServerAction {
    readonly type: ChainsActionType.AddRpcServer;
}

export interface RemoveRpcServerAction extends BaseServerAction {
    readonly type: ChainsActionType.RemoveRpcServer;
}

export interface SetRpcServerStatusAction extends BaseServerAction {
    readonly type: ChainsActionType.SetRpcServerStatus;
    readonly status: RpcServerStatus;
}
