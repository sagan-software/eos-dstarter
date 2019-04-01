import { JsonRpc } from 'eosjs';

export interface RpcServersState {
    [url: string]: RpcServer;
}

export type RpcServer =
    | RpcServerUnknown
    | RpcServerChecking
    | RpcServerOkay
    | RpcServerError;

export enum RpcServerProtocol {
    Https = 'https',
    Http = 'http',
}

export enum RpcServerStatus {
    Unknown,
    Checking,
    Okay,
    Error,
}

export interface RpcServerBase {
    readonly protocol: RpcServerProtocol;
    readonly host: string;
    readonly port: number;
}

export interface RpcServerUnknown extends RpcServerBase {
    readonly status: RpcServerStatus.Unknown;
}

export interface RpcServerChecking extends RpcServerBase {
    readonly status: RpcServerStatus.Checking;
    readonly requestStart: Date;
    readonly ping?: number;
    readonly requestEnd?: Date;
    readonly chainId?: string;
    readonly rpc?: JsonRpc;
}

export interface RpcServerOkay extends RpcServerBase {
    readonly status: RpcServerStatus.Okay;
    readonly ping: number;
    readonly requestEnd: Date;
    readonly chainId: string;
    readonly rpc: JsonRpc;
}

export interface RpcServerError extends RpcServerBase {
    readonly status: RpcServerStatus.Error;
    readonly error: any;
}

export function getRpcServerUrl(
    protocol: RpcServerProtocol,
    host: string,
    port: number,
): string {
    return `${protocol}://${host}:${port}`;
}

export function parseRpcServerUrl(url: string): RpcServerUnknown {
    const u = new URL(url);
    const protocol =
        u.protocol === 'http'
            ? RpcServerProtocol.Http
            : RpcServerProtocol.Https;
    const port = u.port
        ? u.port
        : protocol === RpcServerProtocol.Https
        ? '443'
        : '80';
    return {
        status: RpcServerStatus.Unknown,
        protocol,
        host: u.host,
        port: parseInt(port, 10),
    };
}
