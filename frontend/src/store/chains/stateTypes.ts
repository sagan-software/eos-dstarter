export interface ChainsState {
    readonly chains: { readonly [chainId: string]: Chain };
    readonly rpcServers: { readonly [url: string]: RpcServer };
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

export interface RpcServer {
    readonly protocol: RpcServerProtocol;
    readonly host: string;
    readonly port: number;
    readonly status: RpcServerStatus;
}

export enum RpcServerProtocol {
    Https = 'https',
    Http = 'http',
}

export enum RpcServerStatusType {
    Unknown,
    Checking,
    Okay,
    BadResponse,
    Unreachable,
}

export interface RpcServerUnknown {
    readonly type: RpcServerStatusType.Unknown;
}

export interface RpcServerChecking {
    readonly type: RpcServerStatusType.Checking;
    readonly requestStart: Date;
}

export interface RpcServerOkay {
    readonly type: RpcServerStatusType.Okay;
    readonly ping: number;
    readonly requestEnd: Date;
    readonly chainId: string;
}

export interface RpcServerBadResponse {
    readonly type: RpcServerStatusType.BadResponse;
    readonly statusCode: number;
    readonly invalidJson: boolean;
}

export interface RpcServerUnreachable {
    readonly type: RpcServerStatusType.Unreachable;
}

export type RpcServerStatus =
    | RpcServerUnknown
    | RpcServerChecking
    | RpcServerOkay
    | RpcServerBadResponse
    | RpcServerUnreachable;

export function getRpcServerUrl(
    protocol: RpcServerProtocol,
    host: string,
    port: number,
): string {
    return `${protocol}://${host}:${port}`;
}
