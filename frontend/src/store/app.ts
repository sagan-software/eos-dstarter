import { put, takeLatest } from 'redux-saga/effects';
import * as RpcServers from './rpcServers';
import * as Scatter from './scatter';

export enum Type {
    Init = 'APP/INIT',
}

export type Action = Init;

export interface Init {
    readonly type: Type.Init;
}

export function* saga() {
    yield takeLatest(Type.Init, init);
}

function* init() {
    yield put<Scatter.Connect>({
        type: Scatter.Type.Connect,
        appName: 'weos.fund',
    });
    yield put<RpcServers.CheckAll>({
        type: RpcServers.Type.CheckAll,
    });
}
