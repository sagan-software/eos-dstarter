import { Action } from 'redux';
import { RootThunkResult } from '../root';
import { RpcServerStatus } from '../rpcServers';
import * as actions from './actionCreators';
import { DraftPageAction } from './actionTypes';

export type ThunkResult<R> = RootThunkResult<R, DraftPageAction>;

export function load(
    chainIdPrefix: string,
    accountName: string,
    draftName: string,
): ThunkResult<Promise<DraftPageAction>> {
    return async (dispatch, getState) => {
        const { chains, rpcServers } = getState();
        const chain = Object.values(chains).filter(({ chainId }) =>
            chainId.startsWith(chainIdPrefix),
        )[0];
        const rpcServer = Object.values(rpcServers)
            .filter(
                (s) =>
                    s.status === RpcServerStatus.Okay &&
                    s.chainId.startsWith(chainIdPrefix),
            )
            .sort((a, b) => {
                if (
                    a.status === RpcServerStatus.Okay &&
                    b.status === RpcServerStatus.Okay
                ) {
                    return a.ping - b.ping;
                } else {
                    return 0;
                }
            })[0];
        if (chain && rpcServer) {
            dispatch(actions.load(chainIdPrefix, accountName, draftName));
            // TODO test if logged in as accountName
            if (rpcServer.status === RpcServerStatus.Okay) {
                const response = await rpcServer.rpc.get_table_rows({
                    code: chain.contractName,
                    table: 'projects',
                    scope: accountName,
                    json: true,
                    limit: 1,
                    lower_bound: draftName,
                    upper_bound: draftName,
                });
                console.warn('?!?!?!?!?!', response);
            }
            return dispatch(actions.loadOk());
        } else {
            // TODO better error messages
            return dispatch(actions.loadErr());
        }
    };
}
