import { put, select, takeLatest } from 'redux-saga/effects';
import * as Chains from '../chains';
import * as Projects from '../projects';
import * as Root from '../root';
import * as Scatter from '../scatter';
import * as Action from './actions';

export function* saga() {
    yield takeLatest(Action.Type.Load, onLoad);
}

function* onLoad(action: Action.Load) {
    yield* Chains.waitForAll();
    const getState = (state: Root.State) => ({
        chains: Chains.getAllOk(state),
        identity: Scatter.getIdentity(state),
    });

    const { chains, identity }: ReturnType<typeof getState> = yield select(
        getState,
    );
    if (identity.status !== Scatter.IdentityStatus.LoggedIn) {
        return;
    }

    let projects: Projects.ProjectOk[] = [];
    for (const account of identity.accounts) {
        const chain = chains.filter((c) => c.chainId === account.chainId)[0];
        if (!chain) {
            continue;
        }

        const result:
            | Projects.LoadOk
            | Projects.LoadErr = yield* Projects.loadDrafts(
            chain,
            account.name,
        );
        console.warn(result);
        if (result.type === Projects.Type.LoadOk) {
            projects = projects.concat(result.projects);
        }
    }

    yield put<Action.LoadOk>({ type: Action.Type.LoadOk, projects });
}
