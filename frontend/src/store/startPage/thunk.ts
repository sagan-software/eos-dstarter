import * as Eos from 'eosjs';
import Scatter from 'scatterjs-core';
import * as Chains from '../chains';
import * as Root from '../root';
import * as RpcServers from '../rpcServers';
import * as Action from './action';

export type ThunkAction<R> = Root.ThunkAction<R, Action.Action>;

export function submit(
    account: Scatter.Account,
    chain: Chains.Chain,
    rpcServer: RpcServers.ServerOk,
): ThunkAction<Promise<Action.Action>> {
    return async (dispatch, getState) => {
        const { startPage } = getState();
        const draftName = randomName();
        dispatch(Action.submit(account, chain, rpcServer, draftName));
        const rpcServerUrl = RpcServers.serverToUrl(rpcServer);
        const rpc = new Eos.JsonRpc(rpcServerUrl);
        const eos: Eos.Api = Scatter.eos({ chainId: chain.chainId }, Eos.Api, {
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
                Action.submitOk(
                    chain,
                    account,
                    draftName,
                    result.transaction_id,
                ),
            );
        } catch (error) {
            return dispatch(Action.submitErr(error));
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
