import Scatter from 'scatterjs-core';
import * as Chains from '../chains';
import * as Projects from '../projects';
import * as RpcServers from '../rpcServers';

export enum Type {
    NextStep = 'START_PAGE/NEXT_STEP',
    PrevStep = 'START_PAGE/PREV_STEP',
    SetCategory = 'START_PAGE/SET_CATEGORY',
    SetDescription = 'START_PAGE/SET_DESCRIPTION',
    SetChainId = 'START_PAGE/SET_CHAIN_ID',
    Submit = 'START_PAGE/SUBMIT',
    SubmitOk = 'START_PAGE/SUBMIT_OK',
    SubmitErr = 'START_PAGE/SUBMIT_ERR',
}

export type Action =
    | NextStep
    | PrevStep
    | SetCategory
    | SetDescription
    | SetChainId
    | Submit
    | SubmitOk
    | SubmitErr;

export interface NextStep {
    readonly type: Type.NextStep;
}

export function nextStep(): NextStep {
    return {
        type: Type.NextStep,
    };
}

export interface PrevStep {
    readonly type: Type.PrevStep;
}

export function prevStep(): PrevStep {
    return {
        type: Type.PrevStep,
    };
}

export interface SetCategory {
    readonly type: Type.SetCategory;
    readonly value: Projects.Category;
}

export function setCategory(value: Projects.Category): SetCategory {
    return {
        type: Type.SetCategory,
        value,
    };
}

export interface SetDescription {
    readonly type: Type.SetDescription;
    readonly value: string;
}

export function setDescription(value: string): SetDescription {
    return {
        type: Type.SetDescription,
        value,
    };
}

export interface SetChainId {
    readonly type: Type.SetChainId;
    readonly value: string;
}

export function setChainId(value: string): SetChainId {
    return {
        type: Type.SetChainId,
        value,
    };
}

export interface Submit {
    readonly type: Type.Submit;
    readonly account: Scatter.Account;
    readonly chain: Chains.Chain;
    readonly rpcServer: RpcServers.ServerOk;
    readonly draftName: string;
}

export function submit(
    account: Scatter.Account,
    chain: Chains.Chain,
    rpcServer: RpcServers.ServerOk,
    draftName: string,
): Submit {
    return {
        type: Type.Submit,
        account,
        chain,
        rpcServer,
        draftName,
    };
}

export interface SubmitOk {
    readonly type: Type.SubmitOk;
    readonly chain: Chains.Chain;
    readonly account: Scatter.Account;
    readonly draftName: string;
    readonly transactionId: string;
}

export function submitOk(
    chain: Chains.Chain,
    account: Scatter.Account,
    draftName: string,
    transactionId: string,
): SubmitOk {
    return {
        type: Type.SubmitOk,
        chain,
        account,
        draftName,
        transactionId,
    };
}

export interface SubmitErr {
    readonly type: Type.SubmitErr;
    readonly error: any;
}

export function submitErr(error: any): SubmitErr {
    return {
        type: Type.SubmitErr,
        error,
    };
}
