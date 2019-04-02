import { Action } from 'redux';
import { RootThunkResult } from './root';
import * as rpcServers from './rpcServers';
import * as scatter from './scatter';

export type AppThunkResult<R> = RootThunkResult<R, Action>;

export function init(): AppThunkResult<Promise<void>> {
    return async (dispatch) => {
        await Promise.all([
            dispatch(rpcServers.checkAllRpcServers()),
            dispatch(scatter.connect('weos.fund')),
        ]);
    };
}
