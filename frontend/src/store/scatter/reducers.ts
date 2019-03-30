import {
    ScatterAction,
    ScatterActionType,
    ScatterState,
    ScatterStateType,
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
        return {
            type: ScatterStateType.Connecting,
            appName: action.appName,
        };
    case ScatterActionType.SetConnected:
        return {
            type: ScatterStateType.Connected,
            appName: action.appName,
            accounts: [],
        };
    case ScatterActionType.SetUnavailable:
        return {
            type: ScatterStateType.Unavailable,
            appName: action.appName,
        };
    default:
        return state;
    }
}
