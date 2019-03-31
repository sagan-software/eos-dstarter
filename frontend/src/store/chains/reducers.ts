import {
    AddRpcServerAction,
    ChainsAction,
    ChainsActionType,
    RemoveChainAction,
    RemoveRpcServerAction,
    SetChainAction,
    SetRpcServerStatusAction,
} from './actionTypes';
import {
    ChainPriority,
    ChainsState,
    getRpcServerUrl,
    RpcServerProtocol,
    RpcServerStatusType,
} from './stateTypes';

export const initialState: ChainsState = {
    chains: {
        'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906': {
            chainId:
                'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
            displayName: 'EOS Mainnet',
            contractName: 'dstarter.x',
            priority: ChainPriority.High,
        },
        '4667b205c6838ef70ff7988f6e8257e8be0e1284a2f59699054a018f743b1d11': {
            chainId:
                '4667b205c6838ef70ff7988f6e8257e8be0e1284a2f59699054a018f743b1d11',
            displayName: 'Telos Mainnet',
            contractName: 'dstarter.x',
            priority: ChainPriority.Medium,
        },
        '73647cde120091e0a4b85bced2f3cfdb3041e266cbbe95cee59b73235a1b3b6f': {
            chainId:
                '73647cde120091e0a4b85bced2f3cfdb3041e266cbbe95cee59b73235a1b3b6f',
            displayName: 'Worbli Mainnet',
            contractName: 'dstarter.x',
            priority: ChainPriority.Medium,
        },
        'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f': {
            chainId:
                'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f',
            displayName: 'EOS Localnet',
            contractName: 'dappcontract',
            priority: ChainPriority.Low,
        },
    },
    rpcServers: {
        'https://api.eosnewyork.io:443': {
            protocol: RpcServerProtocol.Https,
            host: 'api.eosnewyork.io',
            port: 443,
            status: {
                type: RpcServerStatusType.Unknown,
            },
        },
        'https://127.0.0.1:8889': {
            protocol: RpcServerProtocol.Https,
            host: '127.0.0.1',
            port: 8889,
            status: {
                type: RpcServerStatusType.Unknown,
            },
        },
        'https://api.telosfoundation.io:443': {
            protocol: RpcServerProtocol.Https,
            host: 'api.telosfoundation.io',
            port: 443,
            status: {
                type: RpcServerStatusType.Unknown,
            },
        },
        'https://api.worbli.io:443': {
            protocol: RpcServerProtocol.Https,
            host: 'api.worbli.io',
            port: 443,
            status: {
                type: RpcServerStatusType.Unknown,
            },
        },
    },
};

export function chainsReducer(
    state = initialState,
    action: ChainsAction,
): ChainsState {
    switch (action.type) {
    case ChainsActionType.SetChain:
        return onSetChain(state, action);
    case ChainsActionType.RemoveChain:
        return onRemoveChain(state, action);
    case ChainsActionType.AddRpcServer:
        return onAddRpcServer(state, action);
    case ChainsActionType.RemoveRpcServer:
        return onRemoveRpcServer(state, action);
    case ChainsActionType.SetRpcServerStatus:
        return onSetRpcServerStatus(state, action);
    default:
        return state;
    }
}

function onSetChain(state: ChainsState, action: SetChainAction): ChainsState {
    return {
        ...state,
        chains: {
            ...state.chains,
            [action.chainId]: {
                chainId: action.chainId,
                displayName: action.displayName,
                contractName: action.contractName,
                priority: action.priority,
            },
        },
    };
}

function onRemoveChain(
    state: ChainsState,
    action: RemoveChainAction,
): ChainsState {
    if (action.chainId in state.chains) {
        const chains = { ...state.chains };
        delete chains[action.chainId];
        return {
            ...state,
            chains,
        };
    } else {
        return {
            ...state,
        };
    }
}

function onAddRpcServer(
    state: ChainsState,
    action: AddRpcServerAction,
): ChainsState {
    const rpcServerUrl = getRpcServerUrl(
        action.protocol,
        action.host,
        action.port,
    );
    if (rpcServerUrl in state.rpcServers) {
        return {
            ...state,
        };
    } else {
        return {
            ...state,
            rpcServers: {
                ...state.rpcServers,
                [rpcServerUrl]: {
                    protocol: action.protocol,
                    host: action.host,
                    port: action.port,
                    status: {
                        type: RpcServerStatusType.Unknown,
                    },
                },
            },
        };
    }
}

function onRemoveRpcServer(
    state: ChainsState,
    action: RemoveRpcServerAction,
): ChainsState {
    const rpcServerUrl = getRpcServerUrl(
        action.protocol,
        action.host,
        action.port,
    );
    if (rpcServerUrl in state.rpcServers) {
        const rpcServers = { ...state.rpcServers };
        delete rpcServers[rpcServerUrl];
        return {
            ...state,
            rpcServers,
        };
    } else {
        return {
            ...state,
        };
    }
}

function onSetRpcServerStatus(
    state: ChainsState,
    action: SetRpcServerStatusAction,
): ChainsState {
    const rpcServerUrl = getRpcServerUrl(
        action.protocol,
        action.host,
        action.port,
    );
    return {
        ...state,
        rpcServers: {
            ...state.rpcServers,
            [rpcServerUrl]: {
                protocol: action.protocol,
                host: action.host,
                port: action.port,
                status: action.status,
            },
        },
    };
}
