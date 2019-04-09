import * as Eos from 'eosjs';
import { call, cancel, put, select, takeEvery } from 'redux-saga/effects';
import * as Contract from '../../contract';
import * as RpcServers from '../rpcServers';
import * as Action from './action';
import { getAll } from './selectors';
import * as State from './state';

export function* saga() {
    yield takeEvery(Action.Type.Check, onCheck);
}

function* onCheck({ chain, server }: Action.Check) {
    const chainId = chain.chainId;
    const url = RpcServers.serverToUrl(server);
    const rpc = new Eos.JsonRpc(url);
    let coreSymbol: string;
    try {
        const systemAccount = yield call(rpc.get_account.bind(rpc), 'eosio');
        const coreLiquidBalance = systemAccount.core_liquid_balance;
        coreSymbol = coreLiquidBalance.split(' ')[1];
    } catch (e) {
        yield put<Action.SetErr>({
            type: Action.Type.SetErr,
            chainId,
            error: State.Err.NoCoreSymbol,
        });
        return yield cancel();
    }

    let contract: Eos.RpcInterfaces.GetAbiResult;
    try {
        contract = yield call(rpc.get_abi.bind(rpc), chain.contractName);
    } catch (e) {
        yield put<Action.SetErr>({
            type: Action.Type.SetErr,
            chainId: chain.chainId,
            error: State.Err.NoContractAccount,
        });
        return yield cancel();
    }

    if (contract.abi && Contract.isValidAbi(contract.abi)) {
        yield put<Action.SetOk>({
            type: Action.Type.SetOk,
            chainId: chain.chainId,
            coreSymbol,
        });
    } else {
        yield put<Action.SetErr>({
            type: Action.Type.SetErr,
            chainId: chain.chainId,
            error: State.Err.InvalidContractAbi,
        });
    }
}

function* checkAll(action: Action.CheckAll) {
    const chains = yield select(getAll);
}
