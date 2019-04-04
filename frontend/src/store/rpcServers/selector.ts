import { createSelector } from 'reselect';
import * as Root from '../root';
import * as State from './state';

export const getRpcServers = (rootState: Root.State) =>
    Object.values(rootState.rpcServers);

export const filterRpcServersByStatus = (
    rpcServers: State.Server[],
    status: State.Status,
) => rpcServers.filter((rpcServer) => rpcServer.status === status);

export const filterRpcServersByChainIdPrefix = (
    rpcServers: State.Server[],
    chainIdPrefix: string,
) =>
    rpcServers.filter(
        (rpcServer) =>
            rpcServer.status === State.Status.Ok &&
            rpcServer.chainId.startsWith(chainIdPrefix),
    );

export const sortRpcServersByPing = (rpcServers: State.Server[]) =>
    rpcServers.sort((a, b) => {
        if (a.status === State.Status.Ok) {
            if (b.status === State.Status.Ok) {
                return a.ping - b.ping;
            } else {
                return -1;
            }
        } else {
            if (b.status === State.Status.Ok) {
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
