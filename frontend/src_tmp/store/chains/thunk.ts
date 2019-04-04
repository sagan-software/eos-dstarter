import * as Eos from 'eosjs';
import * as Contract from '../../contract';
import * as Root from '../root';
import * as RpcServers from '../rpcServers';
import * as Action from './action';
import * as State from './state';

export type ThunkResult<R> = Root.ThunkResult<R, Action.Action>;

export function check(chain: State.Chain): ThunkResult<Promise<Action.Action>> {
    return async (dispatch, getState) => {
        dispatch(Action.setChecking(chain.chainId));
        const { rpcServers } = getState();
        const rpcServer = Object.values(rpcServers)
            .filter(
                (s) =>
                    s.status === RpcServers.Status.Ok &&
                    s.chainId === chain.chainId,
            )
            .sort((a, b) => {
                if (
                    a.status === RpcServers.Status.Ok &&
                    b.status === RpcServers.Status.Ok
                ) {
                    return a.ping - b.ping;
                } else {
                    return 0;
                }
            })[0];

        if (rpcServer && rpcServer.status === RpcServers.Status.Ok) {
            let coreSymbol: string;
            try {
                const systemAccount = await rpcServer.rpc.get_account('eosio');
                const coreLiquidBalance = systemAccount.core_liquid_balance;
                coreSymbol = coreLiquidBalance.split(' ')[1];
            } catch (e) {
                return dispatch(
                    Action.setErr(chain.chainId, State.Err.NoCoreSymbol),
                );
            }

            let contract: Eos.RpcInterfaces.GetAbiResult;
            try {
                contract = await rpcServer.rpc.get_abi(chain.contractName);
            } catch (e) {
                return dispatch(
                    Action.setErr(chain.chainId, State.Err.NoContractAccount),
                );
            }

            if (contract.abi && Contract.isValidAbi(contract.abi)) {
                console.error(chain.displayName, contract, Contract.abi);
                return dispatch(
                    Action.setErr(chain.chainId, State.Err.InvalidContractAbi),
                );
            }

            return dispatch(Action.setOk(chain.chainId, coreSymbol));
        } else {
            return dispatch(
                Action.setErr(chain.chainId, State.Err.NoRpcServer),
            );
        }
    };
}

export function checkAll(): ThunkResult<Promise<ReadonlyArray<Action.Action>>> {
    return async (dispatch, getState) => {
        const { chains } = getState();
        return Promise.all(
            Object.values(chains).map((chain) => dispatch(check(chain))),
        );
    };
}
