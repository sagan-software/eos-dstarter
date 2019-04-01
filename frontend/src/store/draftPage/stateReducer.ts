import {
    DraftPageAction,
    DraftPageActionType,
    LoadAction,
    LoadErrAction,
    LoadOkAction,
} from './actionTypes';
import { DraftPageState, DraftPageStateType } from './stateTypes';

export const initialState: DraftPageState = {
    type: DraftPageStateType.Empty,
};

export function draftPageReducer(
    state = initialState,
    action: DraftPageAction,
): DraftPageState {
    switch (action.type) {
    case DraftPageActionType.Load:
        return onLoad(state, action);
    case DraftPageActionType.LoadOk:
        return onLoadOk(state, action);
    case DraftPageActionType.LoadErr:
        return onLoadErr(state, action);
    default:
        return state;
    }
}

function onLoad(state: DraftPageState, action: LoadAction): DraftPageState {
    return { ...state };
}

function onLoadOk(state: DraftPageState, action: LoadOkAction): DraftPageState {
    return { ...state };
}

function onLoadErr(
    state: DraftPageState,
    action: LoadErrAction,
): DraftPageState {
    return { ...state };
}
