import { useEffect, useState } from 'react';
import ScatterJS from 'scatterjs-core';

export type State = 'connecting' | 'connected' | 'unavailable';

export default function useScatterConnection(appName: string) {
    const [state, setState] = useState<State>('connecting');
    const [retryToggle, setRetryToggle] = useState(false);

    useEffect(() => {
        ScatterJS.connect(appName)
            .then((connected) => {
                if (connected) {
                    setState('connected');
                } else {
                    setState('unavailable');
                }
            })
            .catch((error) => {
                setState('unavailable');
            });
    }, [appName, retryToggle]);

    return [state, () => setRetryToggle(!retryToggle)];
}
