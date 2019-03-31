import { Action } from 'redux';
import { AppThunkResult } from '../';
import {
    AddRpcServerAction,
    ChainsAction,
    ChainsActionType,
    RemoveChainAction,
    RemoveRpcServerAction,
    SetChainAction,
    SetRpcServerStatusAction,
} from './actionTypes';
import {
    ChainPriority,
    getRpcServerUrl,
    RpcServerProtocol,
    RpcServerStatus,
    RpcServerStatusType,
} from './stateTypes';

export type ThunkResult<R> = AppThunkResult<R, ChainsAction>;

export function setChain(
    chainId: string,
    displayName: string,
    contractName: string,
    priority: ChainPriority,
): SetChainAction {
    return {
        type: ChainsActionType.SetChain,
        chainId,
        displayName,
        contractName,
        priority,
    };
}

export function removeChain(chainId: string): RemoveChainAction {
    return {
        type: ChainsActionType.RemoveChain,
        chainId,
    };
}

export function addRpcServer(
    protocol: RpcServerProtocol,
    host: string,
    port: number,
): AddRpcServerAction {
    return {
        type: ChainsActionType.AddRpcServer,
        protocol,
        host,
        port,
    };
}

export function removeRpcServer(
    protocol: RpcServerProtocol,
    host: string,
    port: number,
): RemoveRpcServerAction {
    return {
        type: ChainsActionType.RemoveRpcServer,
        protocol,
        host,
        port,
    };
}

export function setRpcServerStatus(
    protocol: RpcServerProtocol,
    host: string,
    port: number,
    status: RpcServerStatus,
): SetRpcServerStatusAction {
    return {
        type: ChainsActionType.SetRpcServerStatus,
        protocol,
        host,
        port,
        status,
    };
}

export function checkRpcServer(
    protocol: RpcServerProtocol,
    host: string,
    port: number,
): ThunkResult<Promise<Action>> {
    return async (dispatch) => {
        const requestStart = new Date();
        dispatch(
            setRpcServerStatus(protocol, host, port, {
                type: RpcServerStatusType.Checking,
                requestStart,
            }),
        );
        const rpcServerUrl = getRpcServerUrl(protocol, host, port);
        // TODO: timeout
        const response = await fetch(`${rpcServerUrl}/v1/chain/get_info`);
        if (response.status < 400) {
            const requestEnd = new Date();
            const ping = requestEnd.getTime() - requestStart.getTime();
            const chainInfo = await response.json();
            return dispatch(
                setRpcServerStatus(protocol, host, port, {
                    type: RpcServerStatusType.Okay,
                    ping,
                    requestEnd,
                    chainId: chainInfo.chain_id,
                }),
            );
        } else {
            return dispatch(
                setRpcServerStatus(protocol, host, port, {
                    type: RpcServerStatusType.BadResponse,
                    statusCode: response.status,
                    invalidJson: false,
                }),
            );
        }
    };
}

export function checkAllRpcServers(): ThunkResult<
    Promise<ReadonlyArray<Action>>
> {
    return (dispatch, getState) => {
        const { chains } = getState();
        const promises = Object.values(chains.rpcServers).map((rpcServer) =>
            dispatch(
                checkRpcServer(
                    rpcServer.protocol,
                    rpcServer.host,
                    rpcServer.port,
                ),
            ),
        );
        return Promise.all(promises);
    };
}
