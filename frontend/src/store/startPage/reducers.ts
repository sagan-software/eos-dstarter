import * as chains from '../chains';
import {
    NextStepAction,
    PrevStepAction,
    SetCategoryAction,
    SetChainIdAction,
    SetDescriptionAction,
    StartPageAction,
    StartPageActionType,
    SubmitAction,
    SubmitErrAction,
    SubmitOkAction,
} from './actionTypes';
import {
    FormStepType,
    getNextStep,
    getPrevStep,
    StartPageState,
    SubmitStateType,
} from './stateTypes';

export const initialState: StartPageState = {
    activeStep: FormStepType.Category,
    category: 0,
    description: '',
    chainId:
        Object.values(chains.initialState.chains)
            .sort((a, b) => a.priority - b.priority)
            .map((chain) => chain.chainId)[0] ||
        'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
    submitState: { type: SubmitStateType.NotSubmitted },
};

export function startPageReducer(
    state = initialState,
    action: StartPageAction,
) {
    switch (action.type) {
    case StartPageActionType.NextStep:
        return onNextStep(state, action);
    case StartPageActionType.PrevStep:
        return onPrevStep(state, action);
    case StartPageActionType.SetCategory:
        return onSetCategory(state, action);
    case StartPageActionType.SetDescription:
        return onSetDescription(state, action);
    case StartPageActionType.SetChainId:
        return onSetChainId(state, action);
    case StartPageActionType.Submit:
        return onSubmit(state, action);
    case StartPageActionType.SubmitOk:
        return onSubmitOk(state, action);
    case StartPageActionType.SubmitErr:
        return onSubmitErr(state, action);
    default:
        return state;
    }
}

function onNextStep(
    state: StartPageState,
    action: NextStepAction,
): StartPageState {
    return {
        ...state,
        activeStep: getNextStep(state.activeStep),
    };
}

function onPrevStep(
    state: StartPageState,
    action: PrevStepAction,
): StartPageState {
    return {
        ...state,
        activeStep: getPrevStep(state.activeStep),
    };
}

function onSetCategory(
    state: StartPageState,
    action: SetCategoryAction,
): StartPageState {
    return {
        ...state,
        category: action.value,
    };
}

function onSetDescription(
    state: StartPageState,
    action: SetDescriptionAction,
): StartPageState {
    return {
        ...state,
        description: action.value,
    };
}

function onSetChainId(
    state: StartPageState,
    action: SetChainIdAction,
): StartPageState {
    return {
        ...state,
        chainId: action.value,
    };
}

function onSubmit(state: StartPageState, action: SubmitAction): StartPageState {
    return {
        ...state,
        submitState: {
            type: SubmitStateType.Submitting,
        },
    };
}

function onSubmitOk(
    state: StartPageState,
    action: SubmitOkAction,
): StartPageState {
    return {
        ...state,
        submitState: {
            type: SubmitStateType.SubmitOk,
            chain: action.chain,
            account: action.account,
            draftName: action.draftName,
            transactionId: action.transactionId,
        },
    };
}

function onSubmitErr(
    state: StartPageState,
    action: SubmitErrAction,
): StartPageState {
    return {
        ...state,
        submitState: {
            type: SubmitStateType.SubmitErr,
        },
    };
}
