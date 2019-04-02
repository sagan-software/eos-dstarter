import Scatter from 'scatterjs-core';
import { Chain } from '../chains';
import { Category } from '../projects';
import { RpcServerOkay } from '../rpcServers';
import {
    NextStepAction,
    PrevStepAction,
    SetCategoryAction,
    SetChainIdAction,
    SetDescriptionAction,
    StartPageActionType,
    SubmitAction,
    SubmitErrAction,
    SubmitOkAction,
} from './actionTypes';

export function nextStep(): NextStepAction {
    return {
        type: StartPageActionType.NextStep,
    };
}

export function prevStep(): PrevStepAction {
    return {
        type: StartPageActionType.PrevStep,
    };
}

export function setCategory(value: Category): SetCategoryAction {
    return {
        type: StartPageActionType.SetCategory,
        value,
    };
}

export function setDescription(value: string): SetDescriptionAction {
    return {
        type: StartPageActionType.SetDescription,
        value,
    };
}

export function setChainId(value: string): SetChainIdAction {
    return {
        type: StartPageActionType.SetChainId,
        value,
    };
}

export function submit(
    account: Scatter.Account,
    chain: Chain,
    rpcServer: RpcServerOkay,
    draftName: string,
): SubmitAction {
    return {
        type: StartPageActionType.Submit,
        account,
        chain,
        rpcServer,
        draftName,
    };
}

export function submitOk(
    chain: Chain,
    account: Scatter.Account,
    draftName: string,
    transactionId: string,
): SubmitOkAction {
    return {
        type: StartPageActionType.SubmitOk,
        chain,
        account,
        draftName,
        transactionId,
    };
}

export function submitErr(error: any): SubmitErrAction {
    return {
        type: StartPageActionType.SubmitErr,
        error,
    };
}
