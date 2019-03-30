import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import ScatterJS from 'scatterjs-core';
import { ScatterAction, ScatterActionType, ScatterState } from './types';

export type ThunkResult<R> = ThunkAction<R, ScatterState, null, ScatterAction>;

export function connect(appName: string): ThunkResult<Promise<Action>> {
    return async (dispatch) => {
        dispatch({
            type: ScatterActionType.Connect,
            appName,
        });
        const connected = await ScatterJS.connect(appName);
        if (connected) {
            return dispatch({
                type: ScatterActionType.SetConnected,
                appName,
            });
        } else {
            return dispatch({
                type: ScatterActionType.SetUnavailable,
                appName,
            });
        }
    };
}
