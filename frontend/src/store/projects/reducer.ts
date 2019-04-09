import * as Action from './actions';
import * as State from './state';

export function reducer(
    state = State.initialState,
    action: Action.Action,
): State.State {
    switch (action.type) {
    case Action.Type.Load:
        return onLoad(state, action);
    case Action.Type.LoadOk:
        return onLoadOk(state, action);
    case Action.Type.LoadErr:
        return onLoadErr(state, action);
    default:
        return state;
    }
}

function onLoad(state: State.State, action: Action.Load): State.State {
    return { ...state };
}

function onLoadOk(state: State.State, action: Action.LoadOk): State.State {
    return { ...state };
}

function onLoadErr(state: State.State, action: Action.LoadErr): State.State {
    return { ...state };
}
