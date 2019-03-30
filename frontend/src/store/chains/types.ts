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

export enum ChainsActionType {
    SetChain = 'chainsSetChain',
    RemoveChain = 'chainsRemoveChain',
    AddRpcServer = 'chainsAddRpcServer',
    RemoveRpcServer = 'chainsRemoveRpcServer',
    SetRpcServerStatus = 'chainsSetRpcServerStatus',
}

export interface SetChainAction {
    readonly type: ChainsActionType.SetChain;
    readonly chainId: string;
    readonly displayName: string;
    readonly contractName: string;
    readonly priority: ChainPriority;
}

export interface RemoveChainAction {
    readonly type: ChainsActionType.RemoveChain;
    readonly chainId: string;
}

export interface BaseServerAction {
    readonly protocol: RpcServerProtocol;
    readonly host: string;
    readonly port: number;
}

export interface AddRpcServerAction extends BaseServerAction {
    readonly type: ChainsActionType.AddRpcServer;
}

export interface RemoveRpcServerAction extends BaseServerAction {
    readonly type: ChainsActionType.RemoveRpcServer;
}

export interface SetRpcServerStatusAction extends BaseServerAction {
    readonly type: ChainsActionType.SetRpcServerStatus;
    readonly status: RpcServerStatus;
}

export function getRpcServerUrl(
    protocol: RpcServerProtocol,
    host: string,
    port: number,
): string {
    return `${protocol}://${host}:${port}`;
}

export type ChainsAction =
    | SetChainAction
    | RemoveChainAction
    | AddRpcServerAction
    | RemoveRpcServerAction
    | SetRpcServerStatusAction;
