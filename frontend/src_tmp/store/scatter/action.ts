import Scatter from 'scatterjs-core';

export enum Type {
    Connect = 'SCATTER/CONNECT',
    ConnectOk = 'SCATTER/CONNECT_OK',
    ConnectErr = 'SCATTER/CONNECT_ERR',
    Login = 'SCATTER/LOGIN',
    LoginOk = 'SCATTER/LOGIN_OK',
    LoginErr = 'SCATTER/LOGIN_ERR',
    Logout = 'SCATTER/LOGOUT',
    LogoutOk = 'SCATTER/LOGOUT_OK',
    SuggestNetwork = 'SCATTER/SUGGEST_NETWORK',
    SuggestNetworkOk = 'SCATTER/SUGGEST_NETWORK_OK',
    SuggestNetworkErr = 'SCATTER/SUGGEST_NETWORK_ERR',
}

export type Action =
    | Connect
    | ConnectOk
    | ConnectErr
    | Login
    | LoginOk
    | LoginErr
    | Logout
    | LogoutOk
    | SuggestNetwork
    | SuggestNetworkOk
    | SuggestNetworkErr;

export interface Connect {
    readonly type: Type.Connect;
    readonly appName: string;
}

export function connect(appName: string): Connect {
    return {
        type: Type.Connect,
        appName,
    };
}

export interface ConnectOk {
    readonly type: Type.ConnectOk;
    readonly appName: string;
    readonly identity: Scatter.Identity | void;
}

export function connectOk(
    appName: string,
    identity: Scatter.Identity | void,
): ConnectOk {
    return {
        type: Type.ConnectOk,
        appName,
        identity,
    };
}

export interface ConnectErr {
    readonly type: Type.ConnectErr;
    readonly appName: string;
}

export function connectErr(appName: string): ConnectErr {
    return {
        type: Type.ConnectErr,
        appName,
    };
}

export interface Login {
    readonly type: Type.Login;
    readonly options: Scatter.LoginOptions;
}

export function login(options: Scatter.LoginOptions): Login {
    return {
        type: Type.Login,
        options,
    };
}

export interface LoginOk {
    readonly type: Type.LoginOk;
    readonly identity: Scatter.Identity;
}

export function loginOk(identity: Scatter.Identity): LoginOk {
    return {
        type: Type.LoginOk,
        identity,
    };
}

export interface LoginErr {
    readonly type: Type.LoginErr;
    readonly error: Scatter.LoginError;
}

export function loginErr(error: Scatter.LoginError): LoginErr {
    return {
        type: Type.LoginErr,
        error,
    };
}

export interface Logout {
    readonly type: Type.Logout;
    readonly identity: Scatter.Identity;
}

export function logout(identity: Scatter.Identity): Logout {
    return {
        type: Type.Logout,
        identity,
    };
}

export interface LogoutOk {
    readonly type: Type.LogoutOk;
}

export function logoutOk(): LogoutOk {
    return {
        type: Type.LogoutOk,
    };
}

export interface SuggestNetwork {
    readonly type: Type.SuggestNetwork;
}

export function suggestNetwork(): SuggestNetwork {
    return {
        type: Type.SuggestNetwork,
    };
}

export interface SuggestNetworkOk {
    readonly type: Type.SuggestNetworkOk;
}

export function suggestNetworkOk(): SuggestNetworkOk {
    return {
        type: Type.SuggestNetworkOk,
    };
}

export interface SuggestNetworkErr {
    readonly type: Type.SuggestNetworkErr;
    readonly error: Scatter.SuggestNetworkError;
}

export function suggestNetworkErr(
    error: Scatter.SuggestNetworkError,
): SuggestNetworkErr {
    return {
        type: Type.SuggestNetworkErr,
        error,
    };
}
