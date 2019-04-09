import * as State from './state';

export enum Type {
    Load = 'PROJECTS/LOAD',
    LoadOk = 'PROJECTS/LOAD_OK',
    LoadErr = 'PROJECTS/LOAD_ERR',
}

export type Action = Load | LoadOk | LoadErr;

export interface Load {
    readonly type: Type.Load;
    readonly chainId: string;
    readonly accountName: string;
    readonly projectName: string;
}

export interface LoadOk {
    readonly type: Type.LoadOk;
    readonly chainId: string;
    readonly accountName: string;
    readonly projectName: string;
    readonly project: State.Project;
}

export interface LoadErr {
    readonly type: Type.LoadErr;
    readonly chainId: string;
    readonly accountName: string;
    readonly projectName: string;
    readonly code: State.ErrorCode;
    readonly message?: any;
}
