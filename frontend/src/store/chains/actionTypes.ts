import { ChainErrorType, ChainPriority } from './stateTypes';

export enum ChainsActionType {
    Upsert = 'CHAINS/UPSERT',
    Remove = 'CHAINS/REMOVE',
    SetOkay = 'CHAINS/SET_OKAY',
    SetChecking = 'CHAINS/SET_CHECKING',
    SetUnknown = 'CHAINS/SET_UNKNOWN',
    SetError = 'CHAINS/SET_ERROR',
}

export type ChainsAction =
    | UpsertAction
    | RemoveAction
    | SetOkayAction
    | SetCheckingAction
    | SetUnknownAction
    | SetErrorAction;

export interface UpsertAction {
    readonly type: ChainsActionType.Upsert;
    readonly chainId: string;
    readonly displayName: string;
    readonly contractName: string;
    readonly priority: ChainPriority;
}

export interface RemoveAction {
    readonly type: ChainsActionType.Remove;
    readonly chainId: string;
}

export interface SetOkayAction {
    readonly type: ChainsActionType.SetOkay;
    readonly chainId: string;
    readonly coreSymbol: string;
}

export interface SetCheckingAction {
    readonly type: ChainsActionType.SetChecking;
    readonly chainId: string;
}

export interface SetUnknownAction {
    readonly type: ChainsActionType.SetUnknown;
    readonly chainId: string;
}

export interface SetErrorAction {
    readonly type: ChainsActionType.SetError;
    readonly chainId: string;
    readonly error: ChainErrorType;
}
