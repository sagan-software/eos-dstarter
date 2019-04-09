import { cancel, put, select, takeEvery } from 'redux-saga/effects';
import * as Chains from '../chains';
import * as Projects from '../projects';
import * as Root from '../root';
import * as RpcServers from '../rpcServers';
import * as Scatter from '../scatter';
import * as Action from './action';
import {
    getActiveStep,
    getCategory,
    getChain,
    getDescription,
    getRpcServer,
} from './selectors';
import * as State from './state';

export function* saga() {
    yield takeEvery(Action.Type.NextStep, onNextStep);
}

function* onNextStep(action: Action.NextStep) {
    const activeStep: ReturnType<typeof getActiveStep> = yield select(
        getActiveStep,
    );
    if (activeStep !== State.FormStep.Submit) {
        return; // TODO cancel?
    }

    const getState = (state: Root.State) => ({
        chain: getChain(state),
        rpcServer: getRpcServer(state),
        category: getCategory(state),
        description: getDescription(state),
    });

    const {
        chain,
        rpcServer,
        category,
        description,
    }: ReturnType<typeof getState> = yield select(getState);

    if (
        !chain ||
        chain.status !== Chains.Status.Ok ||
        !rpcServer ||
        rpcServer.status !== RpcServers.Status.Ok
    ) {
        // TODO
        return;
    }

    const draftName = Projects.randomName();
    try {
        const result = yield* Scatter.transact(rpcServer, (account) => {
            return [
                {
                    account: chain.contractName,
                    name: 'newproject',
                    authorization: [
                        {
                            actor: account.name,
                            permission: account.authority,
                        },
                    ],
                    data: {
                        account: account.name,
                        draft_name: draftName,
                        category,
                        description,
                    },
                },
            ];
        });
        yield put<Action.SubmitOk>({
            type: Action.Type.SubmitOk,
            account: result.account,
            chain,
            draftName,
            transactionId: result.transaction_id,
        });
    } catch (error) {
        console.error(error);
        yield put<Action.SubmitErr>({
            type: Action.Type.SubmitErr,
            error,
        });
        yield cancel();
    }
}
