import {
    FormStepType,
    getNextStep,
    getPrevStep,
    StartPageAction,
    StartPageActionType,
    StartPageState,
} from './types';

export const initialState: StartPageState = {
    activeStep: FormStepType.Category,
    category: 0,
    description: '',
    networkUrl: 'https://127.0.0.1:8889',
};

export function startPageReducer(
    state = initialState,
    action: StartPageAction,
) {
    switch (action.type) {
    case StartPageActionType.NextStep:
        return {
            ...state,
            activeStep: getNextStep(state.activeStep),
        };
    case StartPageActionType.PrevStep:
        return {
            ...state,
            activeStep: getPrevStep(state.activeStep),
        };
    case StartPageActionType.SetCategory:
        return {
            ...state,
            category: action.value,
        };
    case StartPageActionType.SetDescription:
        return {
            ...state,
            description: action.value,
        };
    case StartPageActionType.SetNetworkUrl:
        return {
            ...state,
            networkUrl: action.value,
        };
    case StartPageActionType.Submit:
        return {
            ...state,
        };
    default:
        return state;
    }
}
