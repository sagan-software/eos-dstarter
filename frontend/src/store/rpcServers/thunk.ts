import * as Eos from 'eosjs';
import * as Root from '../root';
import * as Action from './action';
import * as State from './state';

export type ThunkAction<R> = Root.ThunkAction<R, Action.Action>;

export function check(
    server: State.ServerBase,
): ThunkAction<Promise<Action.Action>> {
    return async (dispatch) => {
        const requestStart = new Date();
        dispatch(Action.setChecking(server, requestStart));
        const rpcServerUrl = State.serverToUrl(server);
        const rpc = new Eos.JsonRpc(rpcServerUrl);
        // TODO: timeout
        try {
            const chainInfo = await rpc.get_info();
            const requestEnd = new Date();
            const ping = requestEnd.getTime() - requestStart.getTime();
            return dispatch(
                Action.setOkay(server, ping, requestEnd, chainInfo.chain_id),
            );
        } catch (error) {
            return dispatch(Action.setError(server, error));
        }
    };
}

export function checkAll(): ThunkAction<Promise<ReadonlyArray<Action.Action>>> {
    return (dispatch, getState) => {
        const { rpcServers } = getState();
        const promises = Object.values(rpcServers).map((server) =>
            dispatch(check(server)),
        );
        return Promise.all(promises);
    };
}
