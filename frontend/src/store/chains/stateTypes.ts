export interface ChainsState {
    [chainId: string]: Chain;
}

export interface Chain {
    readonly chainId: string;
    readonly displayName: string;
    readonly contractName: string;
    readonly priority: ChainPriority;
}

export enum ChainPriority {
    High,
    Medium,
    Low,
}
