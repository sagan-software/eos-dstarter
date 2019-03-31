import { Api, JsonRpc } from 'eosjs';
import { Action } from 'redux';
import Scatter from 'scatterjs-core';
import { AppThunkResult } from '../';
import { Chain, getRpcServerUrl, RpcServer } from '../chains';
import { Category } from '../projects';
import {
    NextStepAction,
    PrevStepAction,
    SetCategoryAction,
    SetChainIdAction,
    SetDescriptionAction,
    StartPageAction,
    StartPageActionType,
    SubmitErrAction,
    SubmitOkAction,
} from './actionTypes';

export type ThunkResult<R> = AppThunkResult<R, StartPageAction>;

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

export function submit(
    account: Scatter.Account,
    chain: Chain,
    rpcServer: RpcServer,
): ThunkResult<Promise<Action>> {
    return async (dispatch, getState) => {
        const { startPage } = getState();
        const draftName = randomName();
        dispatch({
            type: StartPageActionType.Submit,
            account,
            chain,
            rpcServer,
            draftName,
        });
        const rpcServerUrl = getRpcServerUrl(
            rpcServer.protocol,
            rpcServer.host,
            rpcServer.port,
        );
        const rpc = new JsonRpc(rpcServerUrl);
        const eos: Api = Scatter.eos({ chainId: chain.chainId }, Api, {
            rpc,
            beta3: true,
        });
        try {
            const result = await eos.transact(
                {
                    actions: [
                        {
                            account: chain.contractName,
                            name: 'newproject',
                            authorization: [
                                {
                                    actor: account.name,
                                    permission: account.authority,
                                },
                            ],
                            data: {
                                account: account.name,
                                draft_name: draftName,
                                category: startPage.category,
                                description: startPage.description,
                            },
                        },
                    ],
                },
                {
                    blocksBehind: 3,
                    expireSeconds: 30,
                },
            );
            console.warn('!!!!!!!!!!', result);
            return dispatch(
                submitOk(chain, account, draftName, result.transaction_id),
            );
        } catch (error) {
            return dispatch(submitErr(error));
        }
    };
}

function randomName(): string {
    let text = '';
    const possible = 'abcdefghijklmnopqrstuvwxyz12345';
    for (let i = 0; i < 12; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
