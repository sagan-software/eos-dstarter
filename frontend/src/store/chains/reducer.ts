import * as Action from './action';
import * as State from './state';

export function reducer(
    state = State.initialState,
    action: Action.Action,
): State.State {
    switch (action.type) {
    case Action.Type.Upsert:
        return onUpsert(state, action);
    case Action.Type.Remove:
        return onRemove(state, action);
    case Action.Type.SetUnknown:
        return onSetUnknown(state, action);
    case Action.Type.SetChecking:
        return onSetChecking(state, action);
    case Action.Type.SetOk:
        return onSetOk(state, action);
    case Action.Type.SetErr:
        return onSetErr(state, action);
    default:
        return state;
    }
}

function onUpsert(state: State.State, action: Action.Upsert): State.State {
    return {
        ...state,
        [action.chainId]: {
            status: State.Status.Unknown,
            env: action.env,
            chainId: action.chainId,
            displayName: action.displayName,
            contractName: action.contractName,
            priority: action.priority,
        },
    };
}

function onRemove(state: State.State, action: Action.Remove): State.State {
    if (action.chainId in state) {
        delete state[action.chainId];
        return { ...state };
    } else {
        return state;
    }
}

function onSetUnknown(
    state: State.State,
    { chainId }: Action.SetUnknown,
): State.State {
    if (chainId in state) {
        const oldChain = state[chainId];
        const newChain: State.ChainUnknown = {
            status: State.Status.Unknown,
            env: oldChain.env,
            chainId,
            displayName: oldChain.displayName,
            contractName: oldChain.contractName,
            priority: oldChain.priority,
        };
        return {
            ...state,
            [chainId]: newChain,
        };
    } else {
        return state;
    }
}

function onSetChecking(
    state: State.State,
    { chainId }: Action.SetChecking,
): State.State {
    if (chainId in state) {
        const oldChain = state[chainId];
        const newChain: State.ChainChecking = {
            status: State.Status.Checking,
            env: oldChain.env,
            chainId,
            displayName: oldChain.displayName,
            contractName: oldChain.contractName,
            priority: oldChain.priority,
        };
        return {
            ...state,
            [chainId]: newChain,
        };
    } else {
        return state;
    }
}

function onSetOk(
    state: State.State,
    { chainId, coreSymbol }: Action.SetOk,
): State.State {
    if (chainId in state) {
        const oldChain = state[chainId];
        const newChain: State.ChainOk = {
            status: State.Status.Ok,
            env: oldChain.env,
            chainId,
            displayName: oldChain.displayName,
            contractName: oldChain.contractName,
            priority: oldChain.priority,
            coreSymbol,
        };
        return {
            ...state,
            [chainId]: newChain,
        };
    } else {
        return state;
    }
}

function onSetErr(
    state: State.State,
    { chainId, error }: Action.SetErr,
): State.State {
    if (chainId in state) {
        const oldChain = state[chainId];
        const newChain: State.ChainErr = {
            status: State.Status.Err,
            env: oldChain.env,
            chainId,
            displayName: oldChain.displayName,
            contractName: oldChain.contractName,
            priority: oldChain.priority,
            error,
        };
        return {
            ...state,
            [chainId]: newChain,
        };
    } else {
        return state;
    }
}
