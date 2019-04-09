import * as Root from '../root';

export interface State {
    readonly selected: {
        [chainId: string]: boolean;
    };
}

export enum Type {
    ToggleChain = 'LOGIN_PAGE/TOGGLE_CHAIN',
}

export type Action = ToggleChain;

export interface ToggleChain {
    readonly type: Type.ToggleChain;
    readonly chainId: string;
}

export const initialState: State = { selected: {} };

export function reducer(state = initialState, action: Action): State {
    switch (action.type) {
    case Type.ToggleChain:
        return onToggleChain(state, action);
    default:
        return { ...state };
    }
}

function onToggleChain(state: State, action: ToggleChain): State {
    if (action.chainId in state.selected) {
        state.selected[action.chainId] = !state.selected[action.chainId];
    } else {
        state.selected[action.chainId] = true;
    }
    return { ...state };
}

export const getSelected = (state: Root.State) => {
    const result: string[] = [];
    for (const [key, val] of Object.entries(state.loginPage.selected)) {
        if (val) {
            result.push(key);
        }
    }
    return result;
};
