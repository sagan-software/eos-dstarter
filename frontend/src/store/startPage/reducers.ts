import * as chains from '../chains';
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
    chainId:
        Object.values(chains.initialState.chains)
            .sort((a, b) => a.priority - b.priority)
            .map((chain) => chain.chainId)[0] ||
        'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
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
    case StartPageActionType.SetChainId:
        return {
            ...state,
            chainId: action.value,
        };
    case StartPageActionType.Submit:
        return {
            ...state,
        };
    default:
        return state;
    }
}
