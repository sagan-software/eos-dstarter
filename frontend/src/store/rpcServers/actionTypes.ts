import { RpcServerProtocol, RpcServerStatus } from './stateTypes';

export enum RpcServersActionType {
    Add = 'RPC_SERVERS/ADD',
    SetUnknown = 'RPC_SERVERS/SET_UNKNOWN',
    SetChecking = 'RPC_SERVERS/SET_CHECKING',
    SetOkay = 'RPC_SERVERS/SET_OKAY',
    SetError = 'RPC_SERVERS/SET_ERROR',
    Remove = 'RPC_SERVERS/REMOVE',
}

export type RpcServersAction =
    | AddAction
    | SetUnknownAction
    | SetCheckingAction
    | SetOkayAction
    | SetErrorAction
    | RemoveAction;

export interface BaseAction {
    readonly protocol: RpcServerProtocol;
    readonly host: string;
    readonly port: number;
}

export interface AddAction extends BaseAction {
    readonly type: RpcServersActionType.Add;
}

export interface SetUnknownAction extends BaseAction {
    readonly type: RpcServersActionType.SetUnknown;
}

export interface SetCheckingAction extends BaseAction {
    readonly type: RpcServersActionType.SetChecking;
    readonly requestStart: Date;
}

export interface SetOkayAction extends BaseAction {
    readonly type: RpcServersActionType.SetOkay;
    readonly ping: number;
    readonly requestEnd: Date;
    readonly chainId: string;
}

export interface SetErrorAction extends BaseAction {
    readonly type: RpcServersActionType.SetError;
    readonly error: any;
}

export interface RemoveAction extends BaseAction {
    readonly type: RpcServersActionType.Remove;
}
