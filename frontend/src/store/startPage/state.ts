import Scatter from 'scatterjs-core';
import * as Chains from '../chains';
import * as Projects from '../projects';

export interface State {
    readonly activeStep: FormStep;
    readonly category: Projects.Category;
    readonly description: string;
    readonly chainId: string;
    readonly submit: Submit;
}

export enum FormStep {
    Category,
    Idea,
    Chain,
}

export enum Status {
    NotSubmitted,
    Submitting,
    SubmitOk,
    SubmitErr,
}

export type Submit = NotSubmitted | Submitting | SubmitOk | SubmitErr;

export interface NotSubmitted {
    readonly status: Status.NotSubmitted;
}

export interface Submitting {
    readonly status: Status.Submitting;
}

export interface SubmitOk {
    readonly status: Status.SubmitOk;
    readonly account: Scatter.Account;
    readonly chain: Chains.Chain;
    readonly draftName: string;
    readonly transactionId: string;
}

export interface SubmitErr {
    readonly status: Status.SubmitErr;
}

export function getNextStep(step: FormStep): FormStep {
    switch (step) {
    case FormStep.Category:
        return FormStep.Idea;
    case FormStep.Idea:
    case FormStep.Chain:
        return FormStep.Chain;
    }
}

export function getPrevStep(step: FormStep): FormStep {
    switch (step) {
    case FormStep.Chain:
        return FormStep.Idea;
    case FormStep.Idea:
    case FormStep.Category:
        return FormStep.Category;
    }
}

export function hasNextStep(step: FormStep): boolean {
    return step !== FormStep.Chain;
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
    }
}

export const initialState: State = {
    activeStep: FormStep.Category,
    category: 0,
    description: '',
    chainId:
        Object.values(Chains.initialState)
            .sort((a, b) => a.priority - b.priority)
            .map((chain) => chain.chainId)[0] ||
        'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
    submit: { status: Status.NotSubmitted },
};
