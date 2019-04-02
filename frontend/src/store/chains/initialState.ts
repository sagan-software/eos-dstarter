import {
    ChainPriority,
    ChainStatus,
    ChainType,
    ChainUnknown,
} from './stateTypes';

export const eosMainnet: ChainUnknown = {
    status: ChainStatus.Unknown,
    type: ChainType.Mainnet,
    chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
    displayName: 'EOS Mainnet',
    contractName: 'weosfund.x',
    priority: ChainPriority.High,
    explorers: [],
};

//     '4667b205c6838ef70ff7988f6e8257e8be0e1284a2f59699054a018f743b1d11': {
//         status: ChainStatus.Unknown,
//         chainId:
//             '4667b205c6838ef70ff7988f6e8257e8be0e1284a2f59699054a018f743b1d11',
//         displayName: 'Telos Mainnet',
//         contractName: 'dstarter.x',
//         priority: ChainPriority.Medium,
//     },
//     '73647cde120091e0a4b85bced2f3cfdb3041e266cbbe95cee59b73235a1b3b6f': {
//         status: ChainStatus.Unknown,
//         chainId:
//             '73647cde120091e0a4b85bced2f3cfdb3041e266cbbe95cee59b73235a1b3b6f',
//         displayName: 'Worbli Mainnet',
//         contractName: 'dstarter.x',
//         priority: ChainPriority.Medium,
//     },
//     cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f: {
//         status: ChainStatus.Unknown,
//         chainId:
//             'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f',
//         displayName: 'EOS Localnet',
//         contractName: 'dappcontract',
//         priority: ChainPriority.Low,
//     },
// };
