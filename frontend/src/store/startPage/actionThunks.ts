import { Api, JsonRpc } from 'eosjs';
import { Action } from 'redux';
import Scatter from 'scatterjs-core';
import { AppThunkResult } from '..';
import { Chain } from '../chains';
import { getRpcServerUrl, RpcServer } from '../rpcServers';
import * as actions from './actionCreators';
import { StartPageAction } from './actionTypes';

export type ThunkResult<R> = AppThunkResult<R, StartPageAction>;

export function submit(
    account: Scatter.Account,
    chain: Chain,
    rpcServer: RpcServer,
): ThunkResult<Promise<Action>> {
    return async (dispatch, getState) => {
        const { startPage } = getState();
        const draftName = randomName();
        dispatch(actions.submit(account, chain, rpcServer, draftName));
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
            return dispatch(
                actions.submitOk(
                    chain,
                    account,
                    draftName,
                    result.transaction_id,
                ),
            );
        } catch (error) {
            return dispatch(actions.submitErr(error));
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
