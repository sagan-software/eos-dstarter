import Scatter from 'scatterjs-core';
import { Category } from '../../categories';
import { Chain, RpcServer } from '../chains';

export enum StartPageActionType {
    NextStep = 'startPageNextStep',
    PrevStep = 'startPagePrevStep',
    SetCategory = 'startPageSetCategory',
    SetDescription = 'startPageSetDescription',
    SetChainId = 'startPageSetChainId',
    Submit = 'startPageSubmit',
    SubmitOk = 'startPageSubmitOk',
    SubmitErr = 'startPageSubmitErr',
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
}

export interface SubmitOkAction {
    readonly type: StartPageActionType.SubmitOk;
}

export interface SubmitErrAction {
    readonly type: StartPageActionType.SubmitErr;
}
