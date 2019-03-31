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
