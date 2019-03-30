import { Category } from '../../categories';

export interface StartPageState {
    readonly activeStep: FormStepType;
    readonly category: Category;
    readonly description: string;
    readonly networkUrl: string;
}

export enum FormStepType {
    Category,
    Idea,
    Chain,
}

export enum StartPageActionType {
    NextStep = 'startPageNextStep',
    PrevStep = 'startPagePrevStep',
    SetCategory = 'startPageSetCategory',
    SetDescription = 'startPageSetDescription',
    SetNetworkUrl = 'startPageSetNetworkUrl',
    Submit = 'startPageSubmit',
}

export type StartPageAction =
    | NextStepAction
    | PrevStepAction
    | SetCategoryAction
    | SetDescriptionAction
    | SetNetworkUrlAction
    | SubmitAction;

export interface NextStepAction {
    readonly type: StartPageActionType.NextStep;
}

export interface PrevStepAction {
    readonly type: StartPageActionType.PrevStep;
}

export interface SetCategoryAction {
    readonly type: StartPageActionType.SetCategory;
    readonly value: Category;
}

export interface SetDescriptionAction {
    readonly type: StartPageActionType.SetDescription;
    readonly value: string;
}

export interface SetNetworkUrlAction {
    readonly type: StartPageActionType.SetNetworkUrl;
    readonly value: string;
}

export interface SubmitAction {
    readonly type: StartPageActionType.Submit;
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
