import Scatter from 'scatterjs-core';
import * as Root from '../root';
import * as Action from './action';

export type ThunkResult<R> = Root.ThunkResult<R, Action.Action>;

export function connect(appName: string): ThunkResult<Promise<Action.Action>> {
    return async (dispatch) => {
        dispatch(Action.connect(appName));
        const connected = await Scatter.connect(appName);
        if (connected) {
            return dispatch(Action.connectOk(appName, Scatter.identity));
        } else {
            return dispatch(Action.connectErr(appName));
        }
    };
}

export function login(
    options: Scatter.LoginOptions,
): ThunkResult<Promise<Action.Action>> {
    return async (dispatch) => {
        dispatch(Action.login(options));
        try {
            const identity = await Scatter.login(options);
            return dispatch(Action.loginOk(identity));
        } catch (error) {
            return dispatch(Action.loginErr(error));
        }
    };
}

export function logout(
    identity: Scatter.Identity,
): ThunkResult<Promise<Action.Action>> {
    return async (dispatch) => {
        dispatch(Action.logout(identity));
        // TODO can this error?
        await Scatter.logout();
        return dispatch(Action.logoutOk());
    };
}
