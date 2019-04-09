import Scatter from 'scatterjs-core';
import * as Chains from '../chains';
import * as Projects from '../projects';

export interface State {
    readonly activeStep: FormStep;
    readonly category: Projects.Category;
    readonly description: string;
    readonly chainId: string;
    readonly submit: SubmitState;
}

export enum FormStep {
    Category,
    Idea,
    Chain,
    Submit,
}

export enum SubmitStatus {
    Default,
    Submitting,
    Ok,
    Err,
}

export type SubmitState =
    | SubmitStateDefault
    | SubmitStateSubmitting
    | SubmitStateOk
    | SubmitStateErr;

export interface SubmitStateDefault {
    readonly status: SubmitStatus.Default;
}

export interface SubmitStateSubmitting {
    readonly status: SubmitStatus.Submitting;
}

export interface SubmitStateOk {
    readonly status: SubmitStatus.Ok;
    readonly account: Scatter.Account;
    readonly chain: Chains.Chain;
    readonly draftName: string;
    readonly transactionId: string;
}

export interface SubmitStateErr {
    readonly status: SubmitStatus.Err;
}

export function getNextStep(step: FormStep): FormStep {
    switch (step) {
    case FormStep.Category:
        return FormStep.Idea;
    case FormStep.Idea:
        return FormStep.Chain;
    case FormStep.Chain:
    case FormStep.Submit:
        return FormStep.Submit;
    }
}

export function getPrevStep(step: FormStep): FormStep {
    switch (step) {
    case FormStep.Submit:
        return FormStep.Chain;
    case FormStep.Chain:
        return FormStep.Idea;
    case FormStep.Idea:
    case FormStep.Category:
        return FormStep.Category;
    }
}

export function hasNextStep(step: FormStep): boolean {
    return step !== FormStep.Submit;
}

export function hasPrevStep(step: FormStep): boolean {
    return step !== FormStep.Category;
}

export const formStepTypes = [FormStep.Category, FormStep.Idea, FormStep.Chain];

export function getStepLabel(step: FormStep): string {
    switch (step) {
    case FormStep.Category:
        return 'Category';
    case FormStep.Idea:
        return 'Project Idea';
    case FormStep.Chain:
        return 'Chain';
    case FormStep.Submit:
        return 'Continue';
    }
}

export const initialState: State = {
    activeStep: FormStep.Category,
    category: 0,
    description: '',
    chainId: '',
    submit: { status: SubmitStatus.Default },
};

export type SubmitSummary =
    | SubmitSummarySubmitting
    | SubmitSummaryErr
    | SubmitStateOk;

export interface SubmitSummarySubmitting {
    readonly status: SubmitStatus.Submitting;
    readonly percent: number;
    readonly message: string;
}

export interface SubmitSummaryErr {
    readonly status: SubmitStatus.Err;
    readonly percent: number;
    readonly message: string;
}
