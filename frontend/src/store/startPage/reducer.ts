import * as Action from './action';
import * as State from './state';

export function reducer(state = State.initialState, action: Action.Action) {
    switch (action.type) {
    case Action.Type.NextStep:
        return onNextStep(state, action);
    case Action.Type.PrevStep:
        return onPrevStep(state, action);
    case Action.Type.SetCategory:
        return onSetCategory(state, action);
    case Action.Type.SetDescription:
        return onSetDescription(state, action);
    case Action.Type.SetChainId:
        return onSetChainId(state, action);
    case Action.Type.Submit:
        return onSubmit(state, action);
    case Action.Type.SubmitOk:
        return onSubmitOk(state, action);
    case Action.Type.SubmitErr:
        return onSubmitErr(state, action);
    default:
        return state;
    }
}

function onNextStep(state: State.State, action: Action.NextStep): State.State {
    return {
        ...state,
        activeStep: State.getNextStep(state.activeStep),
    };
}

function onPrevStep(state: State.State, action: Action.PrevStep): State.State {
    return {
        ...state,
        activeStep: State.getPrevStep(state.activeStep),
    };
}

function onSetCategory(
    state: State.State,
    action: Action.SetCategory,
): State.State {
    return {
        ...state,
        category: action.value,
    };
}

function onSetDescription(
    state: State.State,
    action: Action.SetDescription,
): State.State {
    return {
        ...state,
        description: action.value,
    };
}

function onSetChainId(
    state: State.State,
    action: Action.SetChainId,
): State.State {
    return {
        ...state,
        chainId: action.value,
    };
}

function onSubmit(state: State.State, action: Action.Submit): State.State {
    return {
        ...state,
        submit: {
            status: State.Status.Submitting,
        },
    };
}

function onSubmitOk(state: State.State, action: Action.SubmitOk): State.State {
    return {
        ...state,
        submit: {
            status: State.Status.SubmitOk,
            chain: action.chain,
            account: action.account,
            draftName: action.draftName,
            transactionId: action.transactionId,
        },
    };
}

function onSubmitErr(
    state: State.State,
    action: Action.SubmitErr,
): State.State {
    return {
        ...state,
        submit: {
            status: State.Status.SubmitErr,
        },
    };
}
