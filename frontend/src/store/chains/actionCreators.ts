import { ChainsActionType, RemoveAction, SetAction } from './actionTypes';
import { ChainPriority } from './stateTypes';

export function set(
    chainId: string,
    displayName: string,
    contractName: string,
    priority: ChainPriority,
): SetAction {
    return {
        type: ChainsActionType.Set,
        chainId,
        displayName,
        contractName,
        priority,
    };
}

export function remove(chainId: string): RemoveAction {
    return {
        type: ChainsActionType.Remove,
        chainId,
    };
}
