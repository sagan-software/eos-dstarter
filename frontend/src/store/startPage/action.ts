import Scatter from 'scatterjs-core';
import * as Chains from '../chains';
import * as Projects from '../projects';

export enum Type {
    NextStep = 'START_PAGE/NEXT_STEP',
    PrevStep = 'START_PAGE/PREV_STEP',
    SetCategory = 'START_PAGE/SET_CATEGORY',
    SetDescription = 'START_PAGE/SET_DESCRIPTION',
    SetChainId = 'START_PAGE/SET_CHAIN_ID',
    SubmitOk = 'START_PAGE/SUBMIT_OK',
    SubmitErr = 'START_PAGE/SUBMIT_ERR',
}

export type Action =
    | NextStep
    | PrevStep
    | SetCategory
    | SetDescription
    | SetChainId
    | SubmitOk
    | SubmitErr;

export interface NextStep {
    readonly type: Type.NextStep;
}

export interface PrevStep {
    readonly type: Type.PrevStep;
}

export interface SetCategory {
    readonly type: Type.SetCategory;
    readonly value: Projects.Category;
}

export interface SetDescription {
    readonly type: Type.SetDescription;
    readonly value: string;
}

export interface SetChainId {
    readonly type: Type.SetChainId;
    readonly value: string;
}

export interface SubmitOk {
    readonly type: Type.SubmitOk;
    readonly chain: Chains.Chain;
    readonly account: Scatter.Account;
    readonly draftName: string;
    readonly transactionId: string;
}

export interface SubmitErr {
    readonly type: Type.SubmitErr;
    readonly error: any;
}
