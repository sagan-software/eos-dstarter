import Scatter from 'scatterjs-core';
import { Category } from '../../categories';

export interface StartPageState {
    readonly activeStep: FormStepType;
    readonly category: Category;
    readonly description: string;
    readonly chainId: string;
}

export enum FormStepType {
    Category,
    Idea,
    Chain,
}

export enum SubmitStateType {
    NotSubmitted,
    Submitting,
    Error,
}

export interface NotSubmittedState {
    readonly type: SubmitStateType.NotSubmitted;
}

export interface SubmittingState {
    readonly type: SubmitStateType.Submitting;
    readonly account: Scatter.Account;
    readonly network: Scatter.FullNetwork;
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
