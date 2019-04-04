import Scatter from 'scatterjs-core';
import * as Root from '../root';
import * as Action from './action';

export type ThunkAction<R> = Root.ThunkAction<R, Action.Action>;

export function connect(appName: string): ThunkAction<Promise<Action.Action>> {
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
): ThunkAction<Promise<Action.Action>> {
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
): ThunkAction<Promise<Action.Action>> {
    return async (dispatch) => {
        dispatch(Action.logout(identity));
        // TODO can this error?
        await Scatter.logout();
        return dispatch(Action.logoutOk());
    };
}
