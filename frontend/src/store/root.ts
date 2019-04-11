import { Action, combineReducers } from 'redux';
import { spawn } from 'redux-saga/effects';
import * as App from './app';
import * as Chains from './chains';
import * as DraftPage from './draftPage';
import * as Explorers from './explorers';
import * as LoginPage from './loginPage';
import * as MyProjectsPage from './myProjectsPage';
import * as Projects from './projects';
import * as RpcServers from './rpcServers';
import * as Scatter from './scatter';
import * as StartPage from './startPage';

export const reducer = combineReducers({
    chains: Chains.reducer,
    draftPage: DraftPage.reducer,
    explorers: Explorers.reducer,
    loginPage: LoginPage.reducer,
    projects: Projects.reducer,
    rpcServers: RpcServers.reducer,
    scatter: Scatter.reducer,
    startPage: StartPage.reducer,
    myProjectsPage: MyProjectsPage.reducer,
});

export type State = ReturnType<typeof reducer>;

export type Action =
    | App.Action
    | Chains.Action
    | DraftPage.Action
    | Explorers.Action
    | LoginPage.Action
    | MyProjectsPage.Action
    | Projects.Action
    | RpcServers.Action
    | Scatter.Action
    | StartPage.Action;

export function* saga() {
    yield spawn(App.saga);
    yield spawn(Chains.saga);
    yield spawn(DraftPage.saga);
    yield spawn(Projects.saga);
    yield spawn(MyProjectsPage.saga);
    yield spawn(RpcServers.saga);
    yield spawn(Scatter.saga);
    yield spawn(StartPage.saga);
}
