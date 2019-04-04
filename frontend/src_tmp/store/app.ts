import * as Chains from './chains';
import * as Root from './root';
import * as RpcServers from './rpcServers';
import * as Scatter from './scatter';

export type ThunkResult<R> = Root.ThunkResult<R, Root.Action>;

export function init(): ThunkResult<Promise<void>> {
    return async (dispatch) => {
        await Promise.all([
            dispatch(RpcServers.checkAll()),
            dispatch(Scatter.connect('weos.fund')),
        ]);
        await dispatch(Chains.checkAll());
    };
}
