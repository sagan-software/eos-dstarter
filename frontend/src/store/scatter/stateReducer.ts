import {
    ConnectAction,
    ConnectErrAction,
    ConnectOkAction,
    LoginAction,
    LoginErrAction,
    LoginOkAction,
    LogoutAction,
    LogoutOkAction,
    ScatterAction,
    ScatterActionType,
    SuggestNetworkAction,
    SuggestNetworkErrAction,
    SuggestNetworkOkAction,
} from './actionTypes';
import {
    IdentityStateType,
    ScatterState,
    ScatterStateType,
} from './stateTypes';

export const initialState: ScatterState = {
    type: ScatterStateType.Idle,
};

export function scatterReducer(
    state = initialState,
    action: ScatterAction,
): ScatterState {
    switch (action.type) {
    case ScatterActionType.Connect:
        return onConnect(state, action);
    case ScatterActionType.ConnectOk:
        return onConnectOk(state, action);
    case ScatterActionType.ConnectErr:
        return onConnectErr(state, action);
    case ScatterActionType.Login:
        return onLogin(state, action);
    case ScatterActionType.LoginOk:
        return onLoginOk(state, action);
    case ScatterActionType.LoginErr:
        return onLoginErr(state, action);
    case ScatterActionType.Logout:
        return onLogout(state, action);
    case ScatterActionType.LogoutOk:
        return onLogoutOk(state, action);
    case ScatterActionType.SuggestNetwork:
        return onSuggestNetwork(state, action);
    case ScatterActionType.SuggestNetworkOk:
        return onSuggestNetworkOk(state, action);
    case ScatterActionType.SuggestNetworkErr:
        return onSuggestNetworkErr(state, action);
    default:
        return state;
    }
}

function onConnect(state: ScatterState, action: ConnectAction): ScatterState {
    return {
        type: ScatterStateType.Connecting,
        appName: action.appName,
    };
}

function onConnectOk(
    state: ScatterState,
    action: ConnectOkAction,
): ScatterState {
    return {
        type: ScatterStateType.Connected,
        appName: action.appName,
        identity: action.identity
            ? { type: IdentityStateType.LoggedIn, ...action.identity }
            : { type: IdentityStateType.LoggedOut },
    };
}

function onConnectErr(
    state: ScatterState,
    action: ConnectErrAction,
): ScatterState {
    return {
        type: ScatterStateType.Unavailable,
        appName: action.appName,
    };
}

function onLogin(state: ScatterState, action: LoginAction): ScatterState {
    if (state.type === ScatterStateType.Connected) {
        return {
            ...state,
            identity: {
                type: IdentityStateType.LoggingIn,
                options: action.options,
            },
        };
    } else {
        return state;
    }
}

function onLoginOk(state: ScatterState, action: LoginOkAction): ScatterState {
    if (state.type === ScatterStateType.Connected) {
        return {
            ...state,
            identity: {
                type: IdentityStateType.LoggedIn,
                ...action.identity,
            },
        };
    } else {
        return state;
    }
}

function onLoginErr(state: ScatterState, action: LoginErrAction): ScatterState {
    if (state.type === ScatterStateType.Connected) {
        return {
            ...state,
            identity: {
                type: IdentityStateType.LoginError,
                error: action.error,
            },
        };
    } else {
        return state;
    }
}

function onLogout(state: ScatterState, action: LogoutAction): ScatterState {
    if (state.type === ScatterStateType.Connected) {
        return {
            ...state,
            identity: {
                type: IdentityStateType.LoggingOut,
                ...action.identity,
            },
        };
    } else {
        return state;
    }
}

function onLogoutOk(state: ScatterState, action: LogoutOkAction): ScatterState {
    if (state.type === ScatterStateType.Connected) {
        return {
            ...state,
            identity: {
                type: IdentityStateType.LoggedOut,
            },
        };
    } else {
        return state;
    }
}

function onSuggestNetwork(
    state: ScatterState,
    action: SuggestNetworkAction,
): ScatterState {
    // TODO
    return state;
}

function onSuggestNetworkOk(
    state: ScatterState,
    action: SuggestNetworkOkAction,
): ScatterState {
    // TODO
    return state;
}

function onSuggestNetworkErr(
    state: ScatterState,
    action: SuggestNetworkErrAction,
): ScatterState {
    // TODO
    return state;
}
