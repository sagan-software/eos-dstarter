import Scatter from 'scatterjs-core';

export type ScatterState =
    | IdleState
    | ConnectingState
    | ConnectedState
    | UnavailableState;

export enum ScatterStateType {
    Idle,
    Connecting,
    Connected,
    Unavailable,
}

export interface IdleState {
    readonly type: ScatterStateType.Idle;
}

export interface ConnectingState {
    readonly type: ScatterStateType.Connecting;
    readonly appName: string;
}

export interface ConnectedState {
    readonly type: ScatterStateType.Connected;
    readonly appName: string;
    readonly identity: IdentityState;
}

export type IdentityState =
    | LoggedOutState
    | LoggedInState
    | LoggingInState
    | LoggingOutState
    | LoginErrorState;

export enum IdentityStateType {
    LoggedOut,
    LoggedIn,
    LoggingIn,
    LoggingOut,
    LoginError,
}

export interface LoggedOutState {
    readonly type: IdentityStateType.LoggedOut;
}

export interface LoggedInState extends Scatter.Identity {
    readonly type: IdentityStateType.LoggedIn;
}

export interface LoggingInState {
    readonly type: IdentityStateType.LoggingIn;
    readonly options: Scatter.LoginOptions;
}

export interface LoggingOutState extends Scatter.Identity {
    readonly type: IdentityStateType.LoggingOut;
}

export interface LoginErrorState {
    readonly type: IdentityStateType.LoginError;
    readonly error: Scatter.LoginError;
}

export interface UnavailableState {
    readonly type: ScatterStateType.Unavailable;
    readonly appName: string;
}

export type ScatterAction =
    | ConnectAction
    | ConnectOkAction
    | ConnectErrAction
    | LoginAction
    | LoginOkAction
    | LoginErrAction
    | LogoutAction
    | LogoutOkAction
    | SuggestNetworkAction
    | SuggestNetworkOkAction
    | SuggestNetworkErrAction;

export enum ScatterActionType {
    Connect = 'scatterConnect',
    ConnectOk = 'scatterConnectOk',
    ConnectErr = 'scatterConnectErr',
    Login = 'scatterLogin',
    LoginOk = 'scatterLoginOk',
    LoginErr = 'scatterLoginErr',
    Logout = 'scatterLogout',
    LogoutOk = 'scatterLogoutOk',
    SuggestNetwork = 'scatterSuggestNetwork',
    SuggestNetworkOk = 'scatterSuggestNetworkOk',
    SuggestNetworkErr = 'scatterSuggestNetworkErr',
}

export interface ConnectAction {
    readonly type: ScatterActionType.Connect;
    readonly appName: string;
}

export interface ConnectOkAction {
    readonly type: ScatterActionType.ConnectOk;
    readonly appName: string;
    readonly identity: Scatter.Identity | void;
}

export interface ConnectErrAction {
    readonly type: ScatterActionType.ConnectErr;
    readonly appName: string;
}

export interface LoginAction {
    readonly type: ScatterActionType.Login;
    readonly options: Scatter.LoginOptions;
}

export interface LoginOkAction {
    readonly type: ScatterActionType.LoginOk;
    readonly identity: Scatter.Identity;
}

export interface LoginErrAction {
    readonly type: ScatterActionType.LoginErr;
    readonly error: Scatter.LoginError;
}

export interface LogoutAction {
    readonly type: ScatterActionType.Logout;
    readonly identity: Scatter.Identity;
}

export interface LogoutOkAction {
    readonly type: ScatterActionType.LogoutOk;
}

export interface SuggestNetworkAction {
    readonly type: ScatterActionType.SuggestNetwork;
}

export interface SuggestNetworkOkAction {
    readonly type: ScatterActionType.SuggestNetworkOk;
}

export interface SuggestNetworkErrAction {
    readonly type: ScatterActionType.SuggestNetworkErr;
    readonly error: Scatter.SuggestNetworkError;
}
