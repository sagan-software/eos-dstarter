import Scatter from 'scatterjs-core';
import { Chain, RpcServer } from '../chains';
import { Category } from '../projects';

export enum StartPageActionType {
    NextStep = 'START_PAGE_NEXT_STEP',
    PrevStep = 'START_PAGE_PREV_STEP',
    SetCategory = 'START_PAGE_SET_CATEGORY',
    SetDescription = 'START_PAGE_SET_DESCRIPTION',
    SetChainId = 'START_PAGE_SET_CHAIN_ID',
    Submit = 'START_PAGE_SUBMIT',
    SubmitOk = 'START_PAGE_SUBMIT_OK',
    SubmitErr = 'START_PAGE_SUBMIT_ERR',
}

export type StartPageAction =
    | NextStepAction
    | PrevStepAction
    | SetCategoryAction
    | SetDescriptionAction
    | SetChainIdAction
    | SubmitAction
    | SubmitOkAction
    | SubmitErrAction;

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

export interface SetChainIdAction {
    readonly type: StartPageActionType.SetChainId;
    readonly value: string;
}

export interface SubmitAction {
    readonly type: StartPageActionType.Submit;
    readonly account: Scatter.Account;
    readonly chain: Chain;
    readonly rpcServer: RpcServer;
    readonly draftName: string;
}

export interface SubmitOkAction {
    readonly type: StartPageActionType.SubmitOk;
    readonly chain: Chain;
    readonly account: Scatter.Account;
    readonly draftName: string;
    readonly transactionId: string;
}

export interface SubmitErrAction {
    readonly type: StartPageActionType.SubmitErr;
    readonly error: any;
}
