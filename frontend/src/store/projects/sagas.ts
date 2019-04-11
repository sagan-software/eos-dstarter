import * as Eos from 'eosjs';
import {
    call,
    cancel,
    put,
    race,
    select,
    take,
    takeEvery,
    takeLatest,
} from 'redux-saga/effects';
import * as Chains from '../chains';
import * as RpcServers from '../rpcServers';
import * as Action from './actions';
import * as State from './state';

export function* saga() {
    yield takeEvery(Action.Type.Load, onLoad);
    // yield takeEvery(Action.Type.LoadForAccount, onLoadForAccount);
}

function* onLoad(action: Action.Load) {
    yield* Chains.waitForChainId(action.chainId);
    const getChain = Chains.getById(action.chainId);
    const chain = yield select(getChain);
    const getRpcServer = RpcServers.getBestByChainId(action.chainId);
    const rpcServer: ReturnType<typeof getRpcServer> = yield select(
        getRpcServer,
    );

    if (
        chain &&
        rpcServer &&
        chain.status === Chains.Status.Ok &&
        rpcServer.status === RpcServers.Status.Ok
    ) {
        yield* load(
            chain,
            rpcServer,
            'projects',
            action.scope,
            action.limit,
            action.lowerBound,
            action.upperBound,
        );
    } else {
        // TODO better error messages
        yield put<Action.LoadErr>({
            type: Action.Type.LoadErr,
            chainId: action.chainId,
            accountName: action.scope,
            code: State.ErrorCode.Unknown,
            message: 'no chain or rpc server',
        });
        yield cancel();
    }
}

export function* load(
    chain: Chains.ChainOk,
    rpcServer: RpcServers.ServerOk,
    table?: string | void,
    scope?: string | void,
    limit?: number | void,
    lowerBound?: string | void,
    upperBound?: string | void,
) {
    const rpcServerUrl = RpcServers.serverToUrl(rpcServer);
    const rpc = new Eos.JsonRpc(rpcServerUrl);
    try {
        const response: {
            rows: ReadonlyArray<State.ProjectRaw>;
            more: boolean;
        } = yield call(rpc.get_table_rows.bind(rpc), {
            code: chain.contractName,
            table: table || 'projects',
            scope: chain.contractName,
            json: true,
            limit,
            lower_bound: lowerBound,
            upper_bound: upperBound,
        });
        console.warn('?!?!?!?!?!', response);
        return yield put<Action.LoadOk>({
            type: Action.Type.LoadOk,
            chainId: chain.chainId,
            accountName: scope || chain.contractName,
            projects: response.rows.map(
                (raw): State.ProjectOk => ({
                    ...State.rawToOk(raw),
                    chainId: chain.chainId,
                    scopeName: scope || chain.contractName,
                }),
            ),
            hasMore: response.more,
        });
    } catch (error) {
        console.error(error);
        return yield put<Action.LoadErr>({
            type: Action.Type.LoadErr,
            chainId: chain.chainId,
            accountName: scope || chain.contractName,
            code: State.ErrorCode.Unknown,
            message: error.message,
        });
    }
}

export function* loadDrafts(chain: Chains.ChainOk, scope: string) {
    const getRpcServer = RpcServers.getBestByChainId(chain.chainId);
    const rpcServer: ReturnType<typeof getRpcServer> = yield select(
        getRpcServer,
    );
    if (!rpcServer) {
        console.warn('11111');
        return;
    }

    // TODO pagination
    return yield* load(chain, rpcServer, undefined, scope);
}
