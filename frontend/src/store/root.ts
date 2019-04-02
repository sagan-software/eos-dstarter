import { Action, combineReducers } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { ChainsAction, chainsReducer } from './chains';
import { DraftPageAction, draftPageReducer } from './draftPage';
import { RpcServersAction, rpcServersReducer } from './rpcServers';
import { ScatterAction, scatterReducer } from './scatter';
import { StartPageAction, startPageReducer } from './startPage';

export const rootReducer = combineReducers({
    scatter: scatterReducer,
    startPage: startPageReducer,
    chains: chainsReducer,
    draftPage: draftPageReducer,
    rpcServers: rpcServersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export type RootAction =
    | ChainsAction
    | DraftPageAction
    | RpcServersAction
    | ScatterAction
    | StartPageAction;

export type RootThunkResult<R, A extends Action<any>> = ThunkAction<
    R,
    RootState,
    null,
    A
>;
