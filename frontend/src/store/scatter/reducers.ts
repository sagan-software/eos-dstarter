import {
    ConnectAction,
    ConnectErrAction,
    ConnectOkAction,
    IdentityStateType,
    LoginAction,
    LoginErrAction,
    LoginOkAction,
    LogoutAction,
    LogoutOkAction,
    ScatterAction,
    ScatterActionType,
    ScatterState,
    ScatterStateType,
    SuggestNetworkAction,
    SuggestNetworkErrAction,
    SuggestNetworkOkAction,
} from './types';

export const initialState: ScatterState = {
    type: ScatterStateType.Idle,
};

export function scatterReducer(
    state = initialState,
    action: ScatterAction,
): ScatterState {
    switch (action.type) {
    case ScatterActionType.Connect:
        return connect(
                state,
                action,
            );
    case ScatterActionType.ConnectOk:
        return connectOk(state, action);
    case ScatterActionType.ConnectErr:
        return connectErr(state, action);
    case ScatterActionType.Login:
        return login(state, action);
    case ScatterActionType.LoginOk:
        return loginOk(state, action);
    case ScatterActionType.LoginErr:
        return loginErr(state, action);
    case ScatterActionType.Logout:
        return logout(state, action);
    case ScatterActionType.LogoutOk:
        return logoutOk(state, action);
    case ScatterActionType.SuggestNetwork:
        return suggestNetwork(state, action);
    case ScatterActionType.SuggestNetworkOk:
        return suggestNetworkOk(state, action);
    case ScatterActionType.SuggestNetworkErr:
        return suggestNetworkErr(state, action);
    default:
        return state;
    }
}

function connect(state: ScatterState, action: ConnectAction): ScatterState {
    return {
        type: ScatterStateType.Connecting,
        appName: action.appName,
    };
}

function connectOk(state: ScatterState, action: ConnectOkAction): ScatterState {
    return {
        type: ScatterStateType.Connected,
        appName: action.appName,
        identity: action.identity
            ? { type: IdentityStateType.LoggedIn, ...action.identity }
            : { type: IdentityStateType.LoggedOut },
    };
}

function connectErr(
    state: ScatterState,
    action: ConnectErrAction,
): ScatterState {
    return {
        type: ScatterStateType.Unavailable,
        appName: action.appName,
    };
}

function login(state: ScatterState, action: LoginAction): ScatterState {
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

function loginOk(state: ScatterState, action: LoginOkAction): ScatterState {
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

function loginErr(state: ScatterState, action: LoginErrAction): ScatterState {
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

function logout(state: ScatterState, action: LogoutAction): ScatterState {
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

function logoutOk(state: ScatterState, action: LogoutOkAction): ScatterState {
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

function suggestNetwork(
    state: ScatterState,
    action: SuggestNetworkAction,
): ScatterState {
    // TODO
    return state;
}

function suggestNetworkOk(
    state: ScatterState,
    action: SuggestNetworkOkAction,
): ScatterState {
    // TODO
    return state;
}

function suggestNetworkErr(
    state: ScatterState,
    action: SuggestNetworkErrAction,
): ScatterState {
    // TODO
    return state;
}
