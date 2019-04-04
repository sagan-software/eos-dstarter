import { Action, combineReducers } from 'redux';
import { ThunkAction } from 'redux-thunk';
import * as Chains from './chains';
import { Action as ChainsAction } from './chains/action';
import * as DraftPage from './draftPage';
import { Action as DraftPageAction } from './draftPage/action';
import * as RpcServers from './rpcServers';
import { Action as RpcServersAction } from './rpcServers/action';
import * as Scatter from './scatter';
import { Action as ScatterAction } from './scatter/action';
import * as StartPage from './startPage';
import { Action as StartPageAction } from './startPage/action';

export const reducer = combineReducers({
    scatter: Scatter.reducer,
    startPage: StartPage.reducer,
    chains: Chains.reducer,
    draftPage: DraftPage.reducer,
    rpcServers: RpcServers.reducer,
});

export type State = ReturnType<typeof reducer>;

export type Action =
    | ChainsAction
    | DraftPageAction
    | RpcServersAction
    | ScatterAction
    | StartPageAction;

export type ThunkResult<R, A extends Action<any>> = ThunkAction<
    R,
    State,
    null,
    A
>;
