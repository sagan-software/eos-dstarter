import { JsonRpc, RpcInterfaces } from 'eosjs';
import { useEffect, useState } from 'react';

export type State = Waiting | Success | Failure;

export interface Waiting {
    readonly kind: 'waiting';
}

export interface Success {
    readonly kind: 'success';
    readonly info: RpcInterfaces.GetInfoResult;
}

export interface Failure {
    readonly kind: 'failure';
    readonly error: any;
}

export default function useEos(endpoint: string): State {
    const [state, setState] = useState<State>({ kind: 'waiting' });
    const rpc = new JsonRpc(endpoint);

    useEffect(() => {
        rpc.get_info()
            .then((info) => {
                setState({
                    kind: 'success',
                    info,
                });
            })
            .catch((error) => {
                setState({
                    kind: 'failure',
                    error,
                });
            });
    }, [endpoint]);

    return state;
}
