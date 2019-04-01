import { JsonRpc } from 'eosjs';
import { Action } from 'redux';
import { AppThunkResult } from '../';
import * as actions from './actionCreators';
import { RpcServersAction } from './actionTypes';
import {
    getRpcServerUrl,
    RpcServerProtocol,
    RpcServerStatus,
} from './stateTypes';

export type ThunkResult<R> = AppThunkResult<R, RpcServersAction>;

export function checkRpcServer(
    protocol: RpcServerProtocol,
    host: string,
    port: number,
): ThunkResult<Promise<Action>> {
    return async (dispatch) => {
        const requestStart = new Date();
        dispatch(actions.setChecking(protocol, host, port, requestStart));
        const rpcServerUrl = getRpcServerUrl(protocol, host, port);
        const rpc = new JsonRpc(rpcServerUrl);
        // TODO: timeout
        try {
            const chainInfo = await rpc.get_info();
            const requestEnd = new Date();
            const ping = requestEnd.getTime() - requestStart.getTime();
            return dispatch(
                actions.setOkay(
                    protocol,
                    host,
                    port,
                    ping,
                    requestEnd,
                    chainInfo.chain_id,
                ),
            );
        } catch (error) {
            return dispatch(actions.setError(protocol, host, port, error));
        }
    };
}

export function checkAllRpcServers(): ThunkResult<
    Promise<ReadonlyArray<Action>>
> {
    return (dispatch, getState) => {
        const { rpcServers } = getState();
        const promises = Object.values(rpcServers).map((rpcServer) =>
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
