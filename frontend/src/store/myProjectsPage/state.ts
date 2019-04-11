import * as Projects from '../projects';

export type State = LoadingState | LoadedState;

export enum Status {
    Loading,
    Loaded,
}

export interface LoadingState {
    readonly status: Status.Loading;
}

export interface LoadedState {
    readonly status: Status.Loaded;
    readonly projects: ReadonlyArray<Projects.ProjectOk>;
}

export const initialState: State = { status: Status.Loading };
