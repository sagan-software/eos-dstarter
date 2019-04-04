import * as State from './state';

export enum Type {
    Add = 'RPC_SERVERS/ADD',
    SetNotAsked = 'RPC_SERVERS/SET_NOT_ASKED',
    SetChecking = 'RPC_SERVERS/SET_CHECKING',
    SetOk = 'RPC_SERVERS/SET_OK',
    SetErr = 'RPC_SERVERS/SET_ERR',
    Remove = 'RPC_SERVERS/REMOVE',
}

export type Action = Add | SetNotAsked | SetChecking | SetOk | SetErr | Remove;

export interface Add extends State.ServerBase {
    readonly type: Type.Add;
}

export function add({ protocol, host, port }: State.ServerBase): Add {
    return {
        type: Type.Add,
        protocol,
        host,
        port,
    };
}

export interface SetNotAsked extends State.ServerBase {
    readonly type: Type.SetNotAsked;
}

export function setNotAsked({
    protocol,
    host,
    port,
}: State.ServerBase): SetNotAsked {
    return {
        type: Type.SetNotAsked,
        protocol,
        host,
        port,
    };
}

export interface SetChecking extends State.ServerBase {
    readonly type: Type.SetChecking;
    readonly requestStart: Date;
}

export function setChecking(
    { protocol, host, port }: State.ServerBase,
    requestStart: Date,
): SetChecking {
    return {
        type: Type.SetChecking,
        protocol,
        host,
        port,
        requestStart,
    };
}

export interface SetOk extends State.ServerBase {
    readonly type: Type.SetOk;
    readonly ping: number;
    readonly requestEnd: Date;
    readonly chainId: string;
}

export function setOkay(
    { protocol, host, port }: State.ServerBase,
    ping: number,
    requestEnd: Date,
    chainId: string,
): SetOk {
    return {
        type: Type.SetOk,
        protocol,
        host,
        port,
        ping,
        requestEnd,
        chainId,
    };
}

export interface SetErr extends State.ServerBase {
    readonly type: Type.SetErr;
    readonly error: any;
}

export function setError(
    { protocol, host, port }: State.ServerBase,
    error: any,
): SetErr {
    return {
        type: Type.SetErr,
        protocol,
        host,
        port,
        error,
    };
}

export interface Remove extends State.ServerBase {
    readonly type: Type.Remove;
}

export function remove({ protocol, host, port }: State.ServerBase): Remove {
    return {
        type: Type.Remove,
        protocol,
        host,
        port,
    };
}
