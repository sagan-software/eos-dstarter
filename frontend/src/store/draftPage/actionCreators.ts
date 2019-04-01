import {
    DeleteDraftAction,
    DeleteDraftErrAction,
    DeleteDraftOkAction,
    DeleteRewardAction,
    DeleteRewardErrAction,
    DeleteRewardOkAction,
    DraftPageActionType,
    LoadAction,
    LoadErrAction,
    LoadOkAction,
    PublishAction,
    PublishErrAction,
    PublishOkAction,
    SaveBasicsAction,
    SaveBasicsErrAction,
    SaveBasicsOkAction,
    SaveContentAction,
    SaveContentErrAction,
    SaveContentOkAction,
    SaveRewardAction,
    SaveRewardErrAction,
    SaveRewardOkAction,
} from './actionTypes';

export function load(
    chainIdPrefix: string,
    accountName: string,
    draftName: string,
): LoadAction {
    return {
        type: DraftPageActionType.Load,
        chainIdPrefix,
        accountName,
        draftName,
    };
}

export function loadOk(): LoadOkAction {
    return {
        type: DraftPageActionType.LoadOk,
    };
}

export function loadErr(): LoadErrAction {
    return {
        type: DraftPageActionType.LoadErr,
    };
}

export function saveBasics(): SaveBasicsAction {
    return {
        type: DraftPageActionType.SaveBasics,
    };
}

export function saveBasicsOk(): SaveBasicsOkAction {
    return {
        type: DraftPageActionType.SaveBasicsOk,
    };
}

export function saveBasicsErr(): SaveBasicsErrAction {
    return {
        type: DraftPageActionType.SaveBasicsErr,
    };
}

export function saveContent(): SaveContentAction {
    return {
        type: DraftPageActionType.SaveContent,
    };
}

export function saveContentOk(): SaveContentOkAction {
    return {
        type: DraftPageActionType.SaveContentOk,
    };
}

export function saveContentErr(): SaveContentErrAction {
    return {
        type: DraftPageActionType.SaveContentErr,
    };
}

export function saveReward(): SaveRewardAction {
    return {
        type: DraftPageActionType.SaveReward,
    };
}

export function saveRewardOk(): SaveRewardOkAction {
    return {
        type: DraftPageActionType.SaveRewardOk,
    };
}

export function saveRewardErr(): SaveRewardErrAction {
    return {
        type: DraftPageActionType.SaveRewardErr,
    };
}

export function deleteDraft(): DeleteDraftAction {
    return {
        type: DraftPageActionType.DeleteDraft,
    };
}

export function deleteDraftOk(): DeleteDraftOkAction {
    return {
        type: DraftPageActionType.DeleteDraftOk,
    };
}

export function deleteDraftErr(): DeleteDraftErrAction {
    return {
        type: DraftPageActionType.DeleteDraftErr,
    };
}

export function deleteReward(): DeleteRewardAction {
    return {
        type: DraftPageActionType.DeleteReward,
    };
}

export function deleteRewardOk(): DeleteRewardOkAction {
    return {
        type: DraftPageActionType.DeleteRewardOk,
    };
}

export function deleteRewardErr(): DeleteRewardErrAction {
    return {
        type: DraftPageActionType.DeleteRewardErr,
    };
}

export function publish(): PublishAction {
    return {
        type: DraftPageActionType.Publish,
    };
}

export function publishOk(): PublishOkAction {
    return {
        type: DraftPageActionType.PublishOk,
    };
}

export function publishErr(): PublishErrAction {
    return {
        type: DraftPageActionType.PublishErr,
    };
}
