import * as Projects from '../projects';

export enum Type {
    Load = 'MY_PROJECTS/LOAD',
    LoadOk = 'MY_PROJECTS/LOAD_OK',
}

export type Action = Load | LoadOk;

export interface Load {
    readonly type: Type.Load;
}

export interface LoadOk {
    readonly type: Type.LoadOk;
    readonly projects: ReadonlyArray<Projects.ProjectOk>;
}
