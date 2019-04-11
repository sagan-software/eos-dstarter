import * as Root from '../root';
import * as State from './state';

export const getAll = (chainId: string, scopeName: string) => (
    state: Root.State,
): ReadonlyArray<State.ProjectOk> =>
    state.projects[chainId] && state.projects[chainId][scopeName]
        ? Object.values(state.projects[chainId][scopeName])
        : [];
