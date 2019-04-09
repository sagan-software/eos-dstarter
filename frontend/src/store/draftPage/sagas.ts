import * as Eos from 'eosjs';
import { call, cancel, put, select, takeLatest } from 'redux-saga/effects';
import * as Chains from '../chains';
import * as Projects from '../projects';
import * as RpcServers from '../rpcServers';
import * as Action from './action';

export function* saga() {
    yield takeLatest(Action.Type.Load, onLoad);
}

function* onLoad({ chainIdPrefix, accountName, draftName }: Action.Load) {
    const getChain = Chains.getByIdPrefix(chainIdPrefix);
    const chain: ReturnType<typeof getChain> = yield select(getChain);
    if (chain) {
        yield put<Projects.Load>({
            type: Projects.Type.Load,
            chainId: chain.chainId,
            accountName,
            projectName: draftName,
        });
    } else {
        // TODO
    }
}
