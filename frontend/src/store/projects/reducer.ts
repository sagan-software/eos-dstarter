import merge from 'lodash.merge';
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
    const projects = {
        [action.chainId]: {
            [action.accountName]: action.projects.reduce(
                (acc: { [projectName: string]: State.ProjectOk }, cur) => {
                    acc[cur.projectName] = cur;
                    return acc;
                },
                {},
            ),
        },
    };
    return merge({}, state, projects);
}

function onLoadErr(state: State.State, action: Action.LoadErr): State.State {
    return { ...state };
}
