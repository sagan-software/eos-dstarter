import * as Eos from 'eosjs';
import * as Action from './action';
import * as State from './state';

export function reducer(
    state = State.initialState,
    action: Action.Action,
): State.State {
    switch (action.type) {
    case Action.Type.Add:
        return onAdd(state, action);
    case Action.Type.SetNotAsked:
        return onSetNotAsked(state, action);
    case Action.Type.SetChecking:
        return onSetChecking(state, action);
    case Action.Type.SetOk:
        return onSetOkay(state, action);
    case Action.Type.SetErr:
        return onSetError(state, action);
    case Action.Type.Remove:
        return onRemove(state, action);
    default:
        return state;
    }
}

function onAdd(state: State.State, action: Action.Add): State.State {
    const url = State.serverToUrl(action);
    if (url in state.rpcServers) {
        return state;
    } else {
        const rpcServer: State.ServerUnknown = {
            status: State.Status.NotAsked,
            protocol: action.protocol,
            host: action.host,
            port: action.port,
        };
        return {
            ...state,
            [url]: rpcServer,
        };
    }
}

function onSetNotAsked(
    state: State.State,
    action: Action.SetNotAsked,
): State.State {
    const rpcServerUrl = State.serverToUrl(action);
    const rpcServer: State.ServerUnknown = {
        status: State.Status.NotAsked,
        protocol: action.protocol,
        host: action.host,
        port: action.port,
    };
    return {
        ...state,
        [rpcServerUrl]: rpcServer,
    };
}

function onSetChecking(
    state: State.State,
    action: Action.SetChecking,
): State.State {
    const rpcServerUrl = State.serverToUrl(action);
    const rpcServer: State.ServerChecking = {
        ...(state[rpcServerUrl] || {}),
        status: State.Status.Checking,
        protocol: action.protocol,
        host: action.host,
        port: action.port,
        requestStart: action.requestStart,
    };
    return {
        ...state,
        [rpcServerUrl]: rpcServer,
    };
}

function onSetOkay(state: State.State, action: Action.SetOk): State.State {
    const rpcServerUrl = State.serverToUrl(action);
    const rpcServer: State.ServerOk = {
        status: State.Status.Ok,
        protocol: action.protocol,
        host: action.host,
        port: action.port,
        ping: action.ping,
        requestEnd: action.requestEnd,
        chainId: action.chainId,
        rpc: new Eos.JsonRpc(rpcServerUrl),
    };
    return {
        ...state,
        [rpcServerUrl]: rpcServer,
    };
}

function onSetError(state: State.State, action: Action.SetErr): State.State {
    const rpcServerUrl = State.serverToUrl(action);
    const rpcServer: State.ServerErr = {
        status: State.Status.Err,
        protocol: action.protocol,
        host: action.host,
        port: action.port,
        error: action.error,
    };
    return {
        ...state,
        [rpcServerUrl]: rpcServer,
    };
}

function onRemove(state: State.State, action: Action.Remove): State.State {
    const url = State.serverToUrl(action);
    if (url in state) {
        delete state[url];
        return { ...state };
    }
    return state;
}
