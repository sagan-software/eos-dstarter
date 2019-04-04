import * as Projects from '../projects';

export type State = Empty | Loading | Loaded | Error;

export enum Status {
    Empty,
    Loading,
    Loaded,
    Error,
}

export interface Empty {
    readonly type: Status.Empty;
}

export interface Base {
    readonly type: Status;
    readonly chainIdPrefix: string;
    readonly accountName: string;
    readonly draftName: string;
}

export interface Loading extends Base {
    readonly type: Status.Loading;
}

export interface Loaded extends Base {
    readonly type: Status.Loaded;
    readonly project: Projects.Project;
}

export interface Error extends Base {
    readonly type: Status.Error;
}

export const initialState: State = {
    type: Status.Empty,
};
