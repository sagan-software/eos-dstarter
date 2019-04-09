import * as Eos from 'eosjs';
import {
    call,
    cancel,
    put,
    race,
    select,
    take,
    takeLatest,
} from 'redux-saga/effects';
import * as Chains from '../chains';
import * as RpcServers from '../rpcServers';
import * as Action from './actions';
import * as State from './state';

export function* saga() {
    yield takeLatest(Action.Type.Load, onLoad);
}

function* onLoad({ chainId, accountName, projectName }: Action.Load) {
    const getChain = Chains.getById(chainId);
    let chain: ReturnType<typeof getChain> = yield select(getChain);
    if (!chain) {
        console.error(
            'Attempted to load a project for an unknown chain ID',
            chainId,
        );
        return yield cancel();
    }

    switch (chain.status) {
    case Chains.Status.Ok:
        break;
    case Chains.Status.Err:
        return yield cancel();
    case Chains.Status.Default:
    case Chains.Status.Checking:
        while (true) {
            const [ok, err]: [
                    Chains.SetOk | void,
                    Chains.SetErr | void
                ] = yield race([
                    take(Chains.Type.SetOk),
                    take(Chains.Type.SetErr),
                ]);
            if (ok && ok.chainId === chainId) {
                    break;
                } else if (err && err.chainId === chainId) {
                    console.error('chain is not ok', err);
                    return yield cancel();
                }
        }
    }

    chain = yield select(getChain);
    const getRpcServer = RpcServers.getBestByChainId(chainId);
    const rpcServer: ReturnType<typeof getRpcServer> = yield select(
        getRpcServer,
    );

    if (
        chain &&
        rpcServer &&
        chain.status === Chains.Status.Ok &&
        rpcServer.status === RpcServers.Status.Ok
    ) {
        const rpcServerUrl = RpcServers.serverToUrl(rpcServer);
        const rpc = new Eos.JsonRpc(rpcServerUrl);
        try {
            const response = yield call(rpc.get_table_rows.bind(rpc), {
                code: chain.contractName,
                table: 'projects',
                scope: accountName,
                json: true,
                limit: 1,
                lower_bound: projectName,
                upper_bound: projectName,
            });
            console.warn('?!?!?!?!?!', response);
            const project = response.rows[0];
            if (project) {
                yield put<Action.LoadOk>({
                    type: Action.Type.LoadOk,
                    chainId,
                    accountName,
                    projectName,
                    project: response.rows[0],
                });
            } else {
                yield put<Action.LoadErr>({
                    type: Action.Type.LoadErr,
                    chainId,
                    accountName,
                    projectName,
                    code: State.ErrorCode.NotFound,
                });
            }
        } catch (error) {
            console.error(error);
            yield put<Action.LoadErr>({
                type: Action.Type.LoadErr,
                chainId,
                accountName,
                projectName,
                code: State.ErrorCode.Unknown,
                message: error.message,
            });
            yield cancel();
        }
    } else {
        // TODO better error messages
        yield put<Action.LoadErr>({
            type: Action.Type.LoadErr,
            chainId,
            accountName,
            projectName,
            code: State.ErrorCode.Unknown,
            message: 'no chain or rpc server',
        });
        yield cancel();
    }
}
