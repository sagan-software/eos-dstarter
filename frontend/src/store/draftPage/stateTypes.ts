import { Project } from '../projects';

export type DraftPageState =
    | EmptyState
    | LoadingState
    | LoadedState
    | ErrorState;

export enum DraftPageStateType {
    Empty,
    Loading,
    Loaded,
    Error,
}

export interface EmptyState {
    readonly type: DraftPageStateType.Empty;
}

export interface DraftPageStateBase {
    readonly type: DraftPageStateType;
    readonly chainIdPrefix: string;
    readonly accountName: string;
    readonly draftName: string;
}

export interface LoadingState extends DraftPageStateBase {
    readonly type: DraftPageStateType.Loading;
}

export interface LoadedState extends DraftPageStateBase {
    readonly type: DraftPageStateType.Loaded;
    readonly project: Project;
}

export interface ErrorState extends DraftPageStateBase {
    readonly type: DraftPageStateType.Error;
}
