import React from 'react';
import CategoryStep from './CategoryStep';
import ChainStep from './ChainStep';
import IdeaStep from './IdeaStep';
import { Action, FormStepType, State } from './state';

export interface ActiveStepProps {
    readonly state: State;
    readonly dispatch: React.Dispatch<Action>;
}

function ActiveStep({ state, dispatch }: ActiveStepProps) {
    switch (state.activeStep) {
    case FormStepType.Category:
        return <CategoryStep value={state.category} dispatch={dispatch} />;
    case FormStepType.Idea:
        return <IdeaStep value={state.description} dispatch={dispatch} />;
    case FormStepType.Chain:
        return <ChainStep dispatch={dispatch} />;
    }
}

export default ActiveStep;
