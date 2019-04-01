import { ChainPriority } from './stateTypes';

export enum ChainsActionType {
    Set = 'CHAINS/SET',
    Remove = 'CHAINS/REMOVE',
}

export type ChainsAction = SetAction | RemoveAction;

export interface SetAction {
    readonly type: ChainsActionType.Set;
    readonly chainId: string;
    readonly displayName: string;
    readonly contractName: string;
    readonly priority: ChainPriority;
}

export interface RemoveAction {
    readonly type: ChainsActionType.Remove;
    readonly chainId: string;
}
