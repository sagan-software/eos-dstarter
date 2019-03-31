import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import Scatter from 'scatterjs-core';
import { ScatterAction, ScatterActionType } from './actionTypes';
import { ScatterState } from './stateTypes';

export type ThunkResult<R> = ThunkAction<R, ScatterState, null, ScatterAction>;

export function connect(appName: string): ThunkResult<Promise<Action>> {
    return async (dispatch) => {
        dispatch({
            type: ScatterActionType.Connect,
            appName,
        });
        const connected = await Scatter.connect(appName);
        if (connected) {
            return dispatch({
                type: ScatterActionType.ConnectOk,
                appName,
                identity: Scatter.identity,
            });
        } else {
            return dispatch({
                type: ScatterActionType.ConnectErr,
                appName,
            });
        }
    };
}

export function login(
    options: Scatter.LoginOptions,
): ThunkResult<Promise<Action>> {
    return async (dispatch) => {
        dispatch({
            type: ScatterActionType.Login,
            options,
        });
        try {
            const identity = await Scatter.login(options);
            return dispatch({
                type: ScatterActionType.LoginOk,
                identity,
            });
        } catch (error) {
            return dispatch({
                type: ScatterActionType.LoginErr,
                error,
            });
        }
    };
}

export function logout(
    identity: Scatter.Identity,
): ThunkResult<Promise<Action>> {
    return async (dispatch) => {
        dispatch({
            type: ScatterActionType.Logout,
            identity,
        });
        // TODO can this error?
        await Scatter.logout();
        return dispatch({
            type: ScatterActionType.LogoutOk,
        });
    };
}
