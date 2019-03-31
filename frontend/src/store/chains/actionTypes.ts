import {
    ChainPriority,
    RpcServerProtocol,
    RpcServerStatus,
} from './stateTypes';

export enum ChainsActionType {
    SetChain = 'chainsSetChain',
    RemoveChain = 'chainsRemoveChain',
    AddRpcServer = 'chainsAddRpcServer',
    RemoveRpcServer = 'chainsRemoveRpcServer',
    SetRpcServerStatus = 'chainsSetRpcServerStatus',
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
