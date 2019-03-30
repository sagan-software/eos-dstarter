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
    readonly accounts: string[];
}

export interface UnavailableState {
    readonly type: ScatterStateType.Unavailable;
    readonly appName: string;
}

export type ScatterAction =
    | ConnectAction
    | SetConnectedAction
    | SetUnavailableAction;

export enum ScatterActionType {
    Connect = 'scatterConnect',
    SetConnected = 'scatterSetConnected',
    SetUnavailable = 'scatterSetUnavailable',
}

export interface ConnectAction {
    readonly type: ScatterActionType.Connect;
    readonly appName: string;
}

export interface SetConnectedAction {
    readonly type: ScatterActionType.SetConnected;
    readonly appName: string;
}

export interface SetUnavailableAction {
    readonly type: ScatterActionType.SetUnavailable;
    readonly appName: string;
}
