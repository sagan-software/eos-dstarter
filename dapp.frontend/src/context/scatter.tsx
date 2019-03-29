import { Api, JsonRpc } from 'eosjs';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import ScatterJS from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs2';

ScatterJS.plugins(new ScatterEOS());

(window as any).ScatterJS = ScatterJS;
(window as any).Api = Api;
(window as any).JsonRpc = JsonRpc;

export type State =
    | IdleState
    | ConnectingState
    | ConnectedState
    | UnavailableState;

type Action =
    | { type: 'connect'; appName: string }
    | { type: 'connected'; appName: string }
    | { type: 'unavailable'; appName: string };

export interface BaseState {
    readonly type: string;
    readonly dispatch: React.Dispatch<Action>;
}

export interface IdleState extends BaseState {
    readonly type: 'idle';
    readonly connect: (appName: string) => void;
}

export interface ConnectingState extends BaseState {
    readonly type: 'connecting';
    readonly appName: string;
}

export interface ConnectedState extends BaseState {
    readonly type: 'connected';
    readonly appName: string;
}

export interface UnavailableState extends BaseState {
    readonly type: 'unavailable';
    readonly appName: string;
    readonly retry: () => void;
}

function connect(dispatch: React.Dispatch<Action>, appName: string) {
    ScatterJS.connect(appName)
        .then((connected) => {
            if (connected) {
                dispatch({ type: 'connected', appName });
            } else {
                dispatch({ type: 'unavailable', appName });
            }
        })
        .catch((error) => {
            dispatch({ type: 'unavailable', appName });
        });
}

function reducer(state: State, action: Action): State {
    switch (action.type) {
    case 'connect':
        connect(
                state.dispatch,
                action.appName,
            );
        return {
                type: 'connecting',
                dispatch: state.dispatch,
                appName: action.appName,
            };
    case 'connected':
        return {
                type: 'connected',
                dispatch: state.dispatch,
                appName: action.appName,
            };
    case 'unavailable':
        return {
                type: 'unavailable',
                dispatch: state.dispatch,
                appName: action.appName,
                retry: () =>
                    state.dispatch({
                        type: 'connect',
                        appName: action.appName,
                    }),
            };
    }
}

const initialState: State = {
    type: 'idle',
    dispatch: () => null,
    connect: () => null,
};

const Context = React.createContext<State>(initialState);

export function ScatterProvider(props: { children: any }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <Context.Provider
            value={{
                type: 'idle',
                dispatch,
                connect: (appName) =>
                    connect(
                        dispatch,
                        appName,
                    ),
            }}
        >
            {props.children}
        </Context.Provider>
    );
}

export function useScatter() {
    return useContext(Context);
}

// export default function(appName: string): State {
//     const [state, setState] = useState<State>({ kind: "waiting" });

//     useEffect(() => {
//         ScatterJS.connect(appName)
//             .then((connected) => {
//                 if (connected) {
//                     setState({ kind: "connected" });
//                 } else {
//                     setState({ kind: "disconnected" });
//                 }
//             })
//             .catch((error) => {
//                 setState({ kind: "disconnected" });
//             });
//     }, [appName]);

//     return state;
// }

// const network = ScatterJS.Network.fromJson({
//     blockchain: "eos",
//     chainId: "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906",
//     host: "nodes.get-scatter.com",
//     port: 443,
//     protocol: "https",
// });
// const rpc = new JsonRpc(network.fullhost());

// ScatterJS.connect("YourAppName").then((connected) => {
//     if (!connected) {
//         return console.error("no scatter");
//     }
//     // tslint:disable-next-line
//     console.log("connected ", connected);

//     const eos: Api = ScatterJS.eos(network, Api, { rpc, beta3: true });

//     ScatterJS.login().then((id) => {
//         if (!id) {
//             return console.error("no identity");
//         }
//         const account = ScatterJS.account("eos");

//         eos.transact(
//             {
//                 actions: [
//                     {
//                         account: "eosio.token",
//                         name: "transfer",
//                         authorization: [
//                             {
//                                 actor: account.name,
//                                 permission: account.authority,
//                             },
//                         ],
//                         data: {
//                             from: account.name,
//                             to: "safetransfer",
//                             quantity: "0.0001 EOS",
//                             memo: account.name,
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
//     });
// });
