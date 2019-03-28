import { Api, JsonRpc } from "eosjs";
import { useEffect, useState } from "react";
import ScatterJS from "scatterjs-core";
// import ScatterEOS from "scatterjs-plugin-eosjs2";

// ScatterJS.plugins(new ScatterEOS());

export type State = Waiting | Connected | Disconnected;

export interface Waiting {
    readonly kind: "waiting";
}

export interface Connected {
    readonly kind: "connected";
}

export interface Disconnected {
    readonly kind: "disconnected";
}

export default function(appName: string): State {
    const [state, setState] = useState<State>({ kind: "waiting" });

    useEffect(() => {
        ScatterJS.connect(appName)
            .then((connected) => {
                if (connected) {
                    setState({ kind: "connected" });
                } else {
                    setState({ kind: "disconnected" });
                }
            })
            .catch((error) => {
                setState({ kind: "disconnected" });
            });
    }, [appName]);

    return state;
}

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
