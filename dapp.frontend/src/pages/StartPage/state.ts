import { Category } from '../../categories';

export interface State {
    readonly activeStep: FormStepType;
    readonly category: Category;
    readonly description: string;
}

export enum FormStepType {
    Category,
    Idea,
    Chain,
}

export const initialState: State = {
    activeStep: FormStepType.Category,
    category: 0,
    description: '',
};

export type Action =
    | { type: 'next' }
    | { type: 'prev' }
    | { type: 'setCategory'; category: Category }
    | { type: 'setDescription'; description: string };

export function reducer(state: State, action: Action) {
    switch (action.type) {
    case 'next':
        return {
            ...state,
            activeStep: getNextStep(state.activeStep),
        };
    case 'prev':
        return {
            ...state,
            activeStep: getPrevStep(state.activeStep),
        };
    case 'setCategory':
        return {
            ...state,
            category: action.category,
        };
    case 'setDescription':
        return {
            ...state,
            description: action.description,
        };
    }
}

export function getNextStep(step: FormStepType): FormStepType {
    switch (step) {
    case FormStepType.Category:
        return FormStepType.Idea;
    case FormStepType.Idea:
    case FormStepType.Chain:
        return FormStepType.Chain;
    }
}

export function getPrevStep(step: FormStepType): FormStepType {
    switch (step) {
    case FormStepType.Chain:
        return FormStepType.Idea;
    case FormStepType.Idea:
    case FormStepType.Category:
        return FormStepType.Category;
    }
}

export function hasNextStep(step: FormStepType): boolean {
    return step !== FormStepType.Chain;
}

export function hasPrevStep(step: FormStepType): boolean {
    return step !== FormStepType.Category;
}

export const formStepTypes = [
    FormStepType.Category,
    FormStepType.Idea,
    FormStepType.Chain,
];

export function getStepLabel(step: FormStepType): string {
    switch (step) {
    case FormStepType.Category:
        return 'Category';
    case FormStepType.Idea:
        return 'Project Idea';
    case FormStepType.Chain:
        return 'Chain';
    }
}
