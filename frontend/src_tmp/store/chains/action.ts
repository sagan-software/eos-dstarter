import * as State from './state';

export enum Type {
    Upsert = 'CHAINS/UPSERT',
    Remove = 'CHAINS/REMOVE',
    SetUnknown = 'CHAINS/SET_UNKNOWN',
    SetChecking = 'CHAINS/SET_CHECKING',
    SetOk = 'CHAINS/SET_OK',
    SetErr = 'CHAINS/SET_ERR',
}

export type Action =
    | Upsert
    | Remove
    | SetUnknown
    | SetChecking
    | SetOk
    | SetErr;

export interface Upsert {
    readonly type: Type.Upsert;
    readonly chainId: string;
    readonly env: State.Env;
    readonly displayName: string;
    readonly contractName: string;
    readonly priority: State.Priority;
}

export function upsert(
    chainId: string,
    env: State.Env,
    displayName: string,
    contractName: string,
    priority: State.Priority,
): Upsert {
    return {
        type: Type.Upsert,
        chainId,
        env,
        displayName,
        contractName,
        priority,
    };
}

export interface Remove {
    readonly type: Type.Remove;
    readonly chainId: string;
}

export function remove(chainId: string): Remove {
    return {
        type: Type.Remove,
        chainId,
    };
}

export interface SetUnknown {
    readonly type: Type.SetUnknown;
    readonly chainId: string;
}

export function setUnknown(chainId: string): SetUnknown {
    return {
        type: Type.SetUnknown,
        chainId,
    };
}

export interface SetChecking {
    readonly type: Type.SetChecking;
    readonly chainId: string;
}

export function setChecking(chainId: string): SetChecking {
    return {
        type: Type.SetChecking,
        chainId,
    };
}

export interface SetOk {
    readonly type: Type.SetOk;
    readonly chainId: string;
    readonly coreSymbol: string;
}

export function setOk(chainId: string, coreSymbol: string): SetOk {
    return {
        type: Type.SetOk,
        chainId,
        coreSymbol,
    };
}

export interface SetErr {
    readonly type: Type.SetErr;
    readonly chainId: string;
    readonly error: State.Err;
}

export function setErr(chainId: string, error: State.Err): SetErr {
    return {
        type: Type.SetErr,
        chainId,
        error,
    };
}
