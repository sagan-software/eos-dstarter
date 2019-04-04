import * as Chains from './chains';
import * as Root from './root';
import * as RpcServers from './rpcServers';
import * as Scatter from './scatter';

export type ThunkAction<R> = Root.ThunkAction<R, Root.Action>;

export function init(): ThunkAction<Promise<void>> {
    return async (dispatch) => {
        await Promise.all([
            dispatch(RpcServers.checkAll()),
            dispatch(Scatter.connect('weos.fund')),
        ]);
        await dispatch(Chains.checkAll());
    };
}
