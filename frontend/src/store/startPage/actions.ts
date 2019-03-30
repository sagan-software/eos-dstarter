import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { Category } from '../../categories';
import {
    NextStepAction,
    PrevStepAction,
    SetCategoryAction,
    SetChainIdAction,
    SetDescriptionAction,
    StartPageAction,
    StartPageActionType,
    StartPageState,
} from './types';

export type ThunkResult<R> = ThunkAction<
    R,
    StartPageState,
    null,
    StartPageAction
>;

export function nextStep(): NextStepAction {
    return {
        type: StartPageActionType.NextStep,
    };
}

export function prevStep(): PrevStepAction {
    return {
        type: StartPageActionType.PrevStep,
    };
}

export function setCategory(value: Category): SetCategoryAction {
    return {
        type: StartPageActionType.SetCategory,
        value,
    };
}

export function setDescription(value: string): SetDescriptionAction {
    return {
        type: StartPageActionType.SetDescription,
        value,
    };
}

export function setChainId(value: string): SetChainIdAction {
    return {
        type: StartPageActionType.SetChainId,
        value,
    };
}

// export function connect(appName: string): ThunkResult<Promise<Action>> {
//     return async (dispatch) => {
//         dispatch({
//             type: ScatterActionType.Connect,
//             appName,
//         });
//         const connected = await ScatterJS.connect(appName);
//         if (connected) {
//             return dispatch({
//                 type: ScatterActionType.SetConnected,
//                 appName,
//             });
//         } else {
//             return dispatch({
//                 type: ScatterActionType.SetUnavailable,
//                 appName,
//             });
//         }
//     };
// }

// export async function newProject(state: State) {
//     const network = ScatterJS.Network.fromJson(state.network);
//     const rpc = new JsonRpc(network.fullhost());

//     await (ScatterJS as any).suggestNetwork(network);
//     (ScatterJS as any).login({ accounts: [network] }).then((id: any) => {
//         const eos: Api = ScatterJS.eos(network, Api, { rpc, beta3: true });
//         const account = ScatterJS.account('eos');
//         eos.transact(
//             {
//                 actions: [
//                     {
//                         account: 'dappcontract',
//                         name: 'newproject',
//                         authorization: [
//                             {
//                                 actor: account.name,
//                                 permission: account.authority,
//                             },
//                         ],
//                         data: {
//                             account: account.name,
//                             draft_name: 'abc123',
//                             category: 100,
//                             description: 'Cool new project',
//                         },
//                     },
//                 ],
//             },
//             {
//                 blocksBehind: 3,
//                 expireSeconds: 30,
//             },
//         )
//             .then((res) => {
//                 // tslint:disable-next-line
//                 console.log("sent: ", res);
//             })
//             .catch((err) => {
//                 // tslint:disable-next-line
//                 console.error("error: ", err);
//             });
//         console.warn('BALLS', id);
//     });
// }
