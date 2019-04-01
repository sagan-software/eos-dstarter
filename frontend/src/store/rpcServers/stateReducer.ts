import { JsonRpc } from 'eosjs';
import {
    AddAction,
    RemoveAction,
    RpcServersAction,
    RpcServersActionType,
    SetCheckingAction,
    SetErrorAction,
    SetOkayAction,
    SetUnknownAction,
} from './actionTypes';
import {
    getRpcServerUrl,
    RpcServerChecking,
    RpcServerError,
    RpcServerOkay,
    RpcServerProtocol,
    RpcServersState,
    RpcServerStatus,
    RpcServerUnknown,
} from './stateTypes';

export const initialState: RpcServersState = {
    'https://api.eosnewyork.io:443': {
        status: RpcServerStatus.Unknown,
        protocol: RpcServerProtocol.Https,
        host: 'api.eosnewyork.io',
        port: 443,
    },
    'https://127.0.0.1:8889': {
        status: RpcServerStatus.Unknown,
        protocol: RpcServerProtocol.Https,
        host: '127.0.0.1',
        port: 8889,
    },
    'https://api.telosfoundation.io:443': {
        status: RpcServerStatus.Unknown,
        protocol: RpcServerProtocol.Https,
        host: 'api.telosfoundation.io',
        port: 443,
    },
    'https://api.worbli.io:443': {
        status: RpcServerStatus.Unknown,
        protocol: RpcServerProtocol.Https,
        host: 'api.worbli.io',
        port: 443,
    },
};

export function rpcServersReducer(
    state = initialState,
    action: RpcServersAction,
): RpcServersState {
    switch (action.type) {
    case RpcServersActionType.Add:
        return onAdd(state, action);
    case RpcServersActionType.SetUnknown:
        return onSetUnknown(state, action);
    case RpcServersActionType.SetChecking:
        return onSetChecking(state, action);
    case RpcServersActionType.SetOkay:
        return onSetOkay(state, action);
    case RpcServersActionType.SetError:
        return onSetError(state, action);
    case RpcServersActionType.Remove:
        return onRemove(state, action);
    default:
        return state;
    }
}

function onAdd(state: RpcServersState, action: AddAction): RpcServersState {
    const rpcServerUrl = getRpcServerUrl(
        action.protocol,
        action.host,
        action.port,
    );
    if (rpcServerUrl in state.rpcServers) {
        return state;
    } else {
        const rpcServer: RpcServerUnknown = {
            status: RpcServerStatus.Unknown,
            protocol: action.protocol,
            host: action.host,
            port: action.port,
        };
        return {
            ...state,
            [rpcServerUrl]: rpcServer,
        };
    }
}

function onSetUnknown(
    state: RpcServersState,
    action: SetUnknownAction,
): RpcServersState {
    const rpcServerUrl = getRpcServerUrl(
        action.protocol,
        action.host,
        action.port,
    );
    const rpcServer: RpcServerUnknown = {
        status: RpcServerStatus.Unknown,
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
    state: RpcServersState,
    action: SetCheckingAction,
): RpcServersState {
    const rpcServerUrl = getRpcServerUrl(
        action.protocol,
        action.host,
        action.port,
    );
    const rpcServer: RpcServerChecking = {
        ...(state[rpcServerUrl] || {}),
        status: RpcServerStatus.Checking,
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

function onSetOkay(
    state: RpcServersState,
    action: SetOkayAction,
): RpcServersState {
    const rpcServerUrl = getRpcServerUrl(
        action.protocol,
        action.host,
        action.port,
    );
    const rpcServer: RpcServerOkay = {
        status: RpcServerStatus.Okay,
        protocol: action.protocol,
        host: action.host,
        port: action.port,
        ping: action.ping,
        requestEnd: action.requestEnd,
        chainId: action.chainId,
        rpc: new JsonRpc(rpcServerUrl),
    };
    return {
        ...state,
        [rpcServerUrl]: rpcServer,
    };
}

function onSetError(
    state: RpcServersState,
    action: SetErrorAction,
): RpcServersState {
    const rpcServerUrl = getRpcServerUrl(
        action.protocol,
        action.host,
        action.port,
    );
    const rpcServer: RpcServerError = {
        status: RpcServerStatus.Error,
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

function onRemove(
    state: RpcServersState,
    action: RemoveAction,
): RpcServersState {
    const rpcServerUrl = getRpcServerUrl(
        action.protocol,
        action.host,
        action.port,
    );
    if (rpcServerUrl in state) {
        delete state[rpcServerUrl];
        return { ...state };
    }
    return state;
}
