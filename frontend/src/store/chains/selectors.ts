import { AppState } from '../';

export const getChains = (state: AppState) => state.chains.chains;
export const getRpcServers = (state: AppState) => state.chains.rpcServers;
