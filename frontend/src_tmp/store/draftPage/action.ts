export enum Type {
    Load = 'DRAFT_PAGE/LOAD',
    LoadOk = 'DRAFT_PAGE/LOAD_OK',
    LoadErr = 'DRAFT_PAGE/LOAD_ERR',
}

export type Action = Load | LoadOk | LoadErr;

export interface Load {
    readonly type: Type.Load;
    readonly chainIdPrefix: string;
    readonly accountName: string;
    readonly draftName: string;
}

export function load(
    chainIdPrefix: string,
    accountName: string,
    draftName: string,
): Load {
    return {
        type: Type.Load,
        chainIdPrefix,
        accountName,
        draftName,
    };
}

export interface LoadOk {
    readonly type: Type.LoadOk;
}

export function loadOk(): LoadOk {
    return {
        type: Type.LoadOk,
    };
}

export interface LoadErr {
    readonly type: Type.LoadErr;
}

export function loadErr(): LoadErr {
    return {
        type: Type.LoadErr,
    };
}
