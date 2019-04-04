import Scatter from 'scatterjs-core';

export type State = NotAsked | Connecting | Connected | Unavailable;

export enum Status {
    NotAsked,
    Connecting,
    Connected,
    Unavailable,
}

export interface NotAsked {
    readonly status: Status.NotAsked;
}

export interface Connecting {
    readonly status: Status.Connecting;
    readonly appName: string;
}

export interface Connected {
    readonly status: Status.Connected;
    readonly appName: string;
    readonly identity: Identity;
}

export type Identity =
    | LoggedOut
    | LoggedIn
    | LoggingIn
    | LoggingOut
    | LoginError;

export enum IdentityStatus {
    LoggedOut,
    LoggedIn,
    LoggingIn,
    LoggingOut,
    LoginError,
}

export interface LoggedOut {
    readonly status: IdentityStatus.LoggedOut;
}

export interface LoggedIn extends Scatter.Identity {
    readonly status: IdentityStatus.LoggedIn;
}

export interface LoggingIn {
    readonly status: IdentityStatus.LoggingIn;
    readonly options: Scatter.LoginOptions;
}

export interface LoggingOut extends Scatter.Identity {
    readonly status: IdentityStatus.LoggingOut;
}

export interface LoginError {
    readonly status: IdentityStatus.LoginError;
    readonly error: Scatter.LoginError;
}

export interface Unavailable {
    readonly status: Status.Unavailable;
    readonly appName: string;
}

export const initialState: State = {
    status: Status.NotAsked,
};
