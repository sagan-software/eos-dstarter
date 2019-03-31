import { Api, JsonRpc } from 'eosjs';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import Scatter from 'scatterjs-core';
import { Category } from '../../categories';
import { Chain, getRpcServerUrl, RpcServer } from '../chains';
import {
    NextStepAction,
    PrevStepAction,
    SetCategoryAction,
    SetChainIdAction,
    SetDescriptionAction,
    StartPageAction,
    StartPageActionType,
} from './actionTypes';
import { StartPageState } from './stateTypes';

export type ThunkResult<R> = ThunkAction<
    R,
    StartPageState,
    null,
    StartPageAction
>;

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
    rpcServer: RpcServer,
    network: Scatter.FullNetwork,
): ThunkResult<Promise<Action>> {
    return async (dispatch, getState) => {
        const state = getState();
        dispatch({
            type: StartPageActionType.Submit,
            account,
            chain,
            rpcServer,
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
                            draft_name: 'abc123',
                            category: state.category,
                            description: state.description,
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
        return dispatch({
            type: StartPageActionType.SubmitOk,
            account,
            network,
        });
    };
}
