import {
    AddAction,
    RemoveAction,
    RpcServersActionType,
    SetCheckingAction,
    SetErrorAction,
    SetOkayAction,
    SetUnknownAction,
} from './actionTypes';
import { RpcServerProtocol } from './stateTypes';

export function add(
    protocol: RpcServerProtocol,
    host: string,
    port: number,
): AddAction {
    return {
        type: RpcServersActionType.Add,
        protocol,
        host,
        port,
    };
}

export function setUnknown(
    protocol: RpcServerProtocol,
    host: string,
    port: number,
): SetUnknownAction {
    return {
        type: RpcServersActionType.SetUnknown,
        protocol,
        host,
        port,
    };
}

export function setChecking(
    protocol: RpcServerProtocol,
    host: string,
    port: number,
    requestStart: Date,
): SetCheckingAction {
    return {
        type: RpcServersActionType.SetChecking,
        protocol,
        host,
        port,
        requestStart,
    };
}

export function setOkay(
    protocol: RpcServerProtocol,
    host: string,
    port: number,
    ping: number,
    requestEnd: Date,
    chainId: string,
): SetOkayAction {
    return {
        type: RpcServersActionType.SetOkay,
        protocol,
        host,
        port,
        ping,
        requestEnd,
        chainId,
    };
}

export function setError(
    protocol: RpcServerProtocol,
    host: string,
    port: number,
    error: any,
): SetErrorAction {
    return {
        type: RpcServersActionType.SetError,
        protocol,
        host,
        port,
        error,
    };
}

export function remove(
    protocol: RpcServerProtocol,
    host: string,
    port: number,
): RemoveAction {
    return {
        type: RpcServersActionType.Remove,
        protocol,
        host,
        port,
    };
}
