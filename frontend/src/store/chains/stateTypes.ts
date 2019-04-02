export interface ChainsState {
    [chainId: string]: Chain;
}

export type Chain = ChainUnknown | ChainChecking | ChainOkay | ChainError;

export interface ChainBase {
    readonly status: ChainStatus;
    readonly type: ChainType;
    readonly chainId: string;
    readonly displayName: string;
    readonly contractName: string;
    readonly priority: ChainPriority;
}

export interface ChainUnknown extends ChainBase {
    readonly status: ChainStatus.Unknown;
}

export interface ChainChecking extends ChainBase {
    readonly status: ChainStatus.ChainChecking;
    readonly coreSymbol?: string;
}
export interface ChainOkay extends ChainBase {
    readonly status: ChainStatus.Okay;
    readonly coreSymbol: string;
}

export interface ChainError extends ChainBase {
    readonly status: ChainStatus.Error;
    readonly error: ChainErrorType;
}

export enum ChainType {
    Mainnet,
    Testnet,
    Devnet,
}

export enum ChainPriority {
    High,
    Medium,
    Low,
}

export enum ChainStatus {
    Unknown,
    ChainChecking,
    Okay,
    Error,
}
export enum ChainErrorType {
    NoContract,
    NoCoreSymbol,
}
