import * as Root from '../root';
import * as RpcServers from '../rpcServers';
import * as Action from './action';

export type ThunkResult<R> = Root.ThunkResult<R, Action.Action>;

export function load(
    chainIdPrefix: string,
    accountName: string,
    draftName: string,
): ThunkResult<Promise<Action.Action>> {
    return async (dispatch, getState) => {
        const { chains, rpcServers } = getState();
        const chain = Object.values(chains).filter(({ chainId }) =>
            chainId.startsWith(chainIdPrefix),
        )[0];
        const rpcServer = Object.values(rpcServers)
            .filter(
                (s) =>
                    s.status === RpcServers.Status.Ok &&
                    s.chainId.startsWith(chainIdPrefix),
            )
            .sort((a, b) => {
                if (
                    a.status === RpcServers.Status.Ok &&
                    b.status === RpcServers.Status.Ok
                ) {
                    return a.ping - b.ping;
                } else {
                    return 0;
                }
            })[0];
        if (chain && rpcServer) {
            dispatch(Action.load(chainIdPrefix, accountName, draftName));
            // TODO test if logged in as accountName
            if (rpcServer.status === RpcServers.Status.Ok) {
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
            return dispatch(Action.loadOk());
        } else {
            // TODO better error messages
            return dispatch(Action.loadErr());
        }
    };
}
