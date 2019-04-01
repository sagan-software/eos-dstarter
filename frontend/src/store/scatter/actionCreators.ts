import Scatter from 'scatterjs-core';
import {
    ConnectAction,
    ConnectErrAction,
    ConnectOkAction,
    LoginAction,
    LoginErrAction,
    LoginOkAction,
    LogoutAction,
    LogoutOkAction,
    ScatterActionType,
    SuggestNetworkAction,
    SuggestNetworkErrAction,
    SuggestNetworkOkAction,
} from './actionTypes';

export function connect(appName: string): ConnectAction {
    return {
        type: ScatterActionType.Connect,
        appName,
    };
}

export function connectOk(
    appName: string,
    identity: Scatter.Identity | void,
): ConnectOkAction {
    return {
        type: ScatterActionType.ConnectOk,
        appName,
        identity,
    };
}

export function connectErr(appName: string): ConnectErrAction {
    return {
        type: ScatterActionType.ConnectErr,
        appName,
    };
}

export function login(options: Scatter.LoginOptions): LoginAction {
    return {
        type: ScatterActionType.Login,
        options,
    };
}

export function loginOk(identity: Scatter.Identity): LoginOkAction {
    return {
        type: ScatterActionType.LoginOk,
        identity,
    };
}

export function loginErr(error: Scatter.LoginError): LoginErrAction {
    return {
        type: ScatterActionType.LoginErr,
        error,
    };
}

export function logout(identity: Scatter.Identity): LogoutAction {
    return {
        type: ScatterActionType.Logout,
        identity,
    };
}

export function logoutOk(): LogoutOkAction {
    return {
        type: ScatterActionType.LogoutOk,
    };
}

export function suggestNetwork(): SuggestNetworkAction {
    return {
        type: ScatterActionType.SuggestNetwork,
    };
}

export function suggestNetworkOk(): SuggestNetworkOkAction {
    return {
        type: ScatterActionType.SuggestNetworkOk,
    };
}

export function suggestNetworkErr(
    error: Scatter.SuggestNetworkError,
): SuggestNetworkErrAction {
    return {
        type: ScatterActionType.SuggestNetworkErr,
        error,
    };
}
