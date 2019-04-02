import { createSelector } from 'reselect';
import { AppState } from '../';
import { RpcServer, RpcServerStatus } from './stateTypes';

export const getRpcServers = (state: AppState) =>
    Object.values(state.rpcServers);

export const filterRpcServersByStatus = (
    rpcServers: RpcServer[],
    status: RpcServerStatus,
) => rpcServers.filter((rpcServer) => rpcServer.status === status);

export const filterRpcServersByChainIdPrefix = (
    rpcServers: RpcServer[],
    chainIdPrefix: string,
) =>
    rpcServers.filter(
        (rpcServer) =>
            rpcServer.status === RpcServerStatus.Okay &&
            rpcServer.chainId.startsWith(chainIdPrefix),
    );

export const sortRpcServersByPing = (rpcServers: RpcServer[]) =>
    rpcServers.sort((a, b) => {
        if (a.status === RpcServerStatus.Okay) {
            if (b.status === RpcServerStatus.Okay) {
                return a.ping - b.ping;
            } else {
                return -1;
            }
        } else {
            if (b.status === RpcServerStatus.Okay) {
                return 1;
            } else {
                return 0;
            }
        }
    });

// export const getBestRpcServer = (chainIdPrefix: string) =>
//     createSelector(
//         getRpcServers,
//         (rpcServers) =>
//             filterRpcServersByChainIdPrefix(rpcServers, chainIdPrefix),
//         sortRpcServersByPing,
//         (rpcServers) => rpcServers[0],
//     );
