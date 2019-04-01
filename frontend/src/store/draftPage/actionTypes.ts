export enum DraftPageActionType {
    Load = 'DRAFT_PAGE/LOAD',
    LoadOk = 'DRAFT_PAGE/LOAD_OK',
    LoadErr = 'DRAFT_PAGE/LOAD_ERR',
    SaveBasics = 'DRAFT_PAGE/SAVE_BASICS',
    SaveBasicsOk = 'DRAFT_PAGE/SAVE_BASICS_OK',
    SaveBasicsErr = 'DRAFT_PAGE/SAVE_BASICS_ERR',
    SaveContent = 'DRAFT_PAGE/SAVE_CONTENT',
    SaveContentOk = 'DRAFT_PAGE/SAVE_CONTENT_OK',
    SaveContentErr = 'DRAFT_PAGE/SAVE_CONTENT_ERR',
    SaveReward = 'DRAFT_PAGE/SAVE_REWARD',
    SaveRewardOk = 'DRAFT_PAGE/SAVE_REWARD_OK',
    SaveRewardErr = 'DRAFT_PAGE/SAVE_REWARD_ERR',
    DeleteDraft = 'DRAFT_PAGE/DELETE_DRAFT',
    DeleteDraftOk = 'DRAFT_PAGE/DELETE_DRAFT_OK',
    DeleteDraftErr = 'DRAFT_PAGE/DELETE_DRAFT_ERR',
    DeleteReward = 'DRAFT_PAGE/DELETE_REWARD',
    DeleteRewardOk = 'DRAFT_PAGE/DELETE_REWARD_OK',
    DeleteRewardErr = 'DRAFT_PAGE/DELETE_REWARD_ERR',
    Publish = 'DRAFT_PAGE/PUBLISH',
    PublishOk = 'DRAFT_PAGE/PUBLISH_OK',
    PublishErr = 'DRAFT_PAGE/PUBLISH_ERR',
}

export type DraftPageAction =
    | LoadAction
    | LoadOkAction
    | LoadErrAction
    | SaveBasicsAction
    | SaveBasicsOkAction
    | SaveBasicsErrAction
    | SaveContentAction
    | SaveContentOkAction
    | SaveContentErrAction
    | SaveRewardAction
    | SaveRewardOkAction
    | SaveRewardErrAction
    | DeleteDraftAction
    | DeleteDraftOkAction
    | DeleteDraftErrAction
    | DeleteRewardAction
    | DeleteRewardOkAction
    | DeleteRewardErrAction
    | PublishAction
    | PublishOkAction
    | PublishErrAction;

export interface LoadAction {
    readonly type: DraftPageActionType.Load;
    readonly chainIdPrefix: string;
    readonly accountName: string;
    readonly draftName: string;
}

export interface LoadOkAction {
    readonly type: DraftPageActionType.LoadOk;
}

export interface LoadErrAction {
    readonly type: DraftPageActionType.LoadErr;
}

export interface SaveBasicsAction {
    readonly type: DraftPageActionType.SaveBasics;
}

export interface SaveBasicsOkAction {
    readonly type: DraftPageActionType.SaveBasicsOk;
}

export interface SaveBasicsErrAction {
    readonly type: DraftPageActionType.SaveBasicsErr;
}

export interface SaveContentAction {
    readonly type: DraftPageActionType.SaveContent;
}

export interface SaveContentOkAction {
    readonly type: DraftPageActionType.SaveContentOk;
}

export interface SaveContentErrAction {
    readonly type: DraftPageActionType.SaveContentErr;
}

export interface SaveRewardAction {
    readonly type: DraftPageActionType.SaveReward;
}

export interface SaveRewardOkAction {
    readonly type: DraftPageActionType.SaveRewardOk;
}

export interface SaveRewardErrAction {
    readonly type: DraftPageActionType.SaveRewardErr;
}

export interface DeleteDraftAction {
    readonly type: DraftPageActionType.DeleteDraft;
}

export interface DeleteDraftOkAction {
    readonly type: DraftPageActionType.DeleteDraftOk;
}

export interface DeleteDraftErrAction {
    readonly type: DraftPageActionType.DeleteDraftErr;
}

export interface DeleteRewardAction {
    readonly type: DraftPageActionType.DeleteReward;
}

export interface DeleteRewardOkAction {
    readonly type: DraftPageActionType.DeleteRewardOk;
}

export interface DeleteRewardErrAction {
    readonly type: DraftPageActionType.DeleteRewardErr;
}

export interface PublishAction {
    readonly type: DraftPageActionType.Publish;
}

export interface PublishOkAction {
    readonly type: DraftPageActionType.PublishOk;
}

export interface PublishErrAction {
    readonly type: DraftPageActionType.PublishErr;
}
