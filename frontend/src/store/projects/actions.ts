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
    readonly table?: string;
    readonly scope: string;
    readonly limit?: number;
    readonly lowerBound?: string;
    readonly upperBound?: string;
}

export interface LoadOk {
    readonly type: Type.LoadOk;
    readonly chainId: string;
    readonly accountName: string;
    readonly projects: ReadonlyArray<State.ProjectOk>;
    readonly hasMore: boolean;
}

export interface LoadErr {
    readonly type: Type.LoadErr;
    readonly chainId: string;
    readonly accountName: string;
    readonly code: State.ErrorCode;
    readonly message?: string;
}
