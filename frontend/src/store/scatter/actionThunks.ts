import { Action } from 'redux';
import Scatter from 'scatterjs-core';
import { RootThunkResult } from '../root';
import * as actions from './actionCreators';
import { ScatterAction } from './actionTypes';

export type ThunkResult<R> = RootThunkResult<R, ScatterAction>;

export function connect(appName: string): ThunkResult<Promise<Action>> {
    return async (dispatch) => {
        dispatch(actions.connect(appName));
        const connected = await Scatter.connect(appName);
        if (connected) {
            return dispatch(actions.connectOk(appName, Scatter.identity));
        } else {
            return dispatch(actions.connectErr(appName));
        }
    };
}

export function login(
    options: Scatter.LoginOptions,
): ThunkResult<Promise<ScatterAction>> {
    return async (dispatch) => {
        dispatch(actions.login(options));
        try {
            const identity = await Scatter.login(options);
            return dispatch(actions.loginOk(identity));
        } catch (error) {
            return dispatch(actions.loginErr(error));
        }
    };
}

export function logout(
    identity: Scatter.Identity,
): ThunkResult<Promise<ScatterAction>> {
    return async (dispatch) => {
        dispatch(actions.logout(identity));
        // TODO can this error?
        await Scatter.logout();
        return dispatch(actions.logoutOk());
    };
}
