import { Api, JsonRpc } from 'eosjs';
import { NetworkJson } from 'scatterjs-core';
import ScatterJS from 'scatterjs-core';
import { Category } from '../../categories';

export interface State {
    readonly activeStep: FormStepType;
    readonly category: Category;
    readonly description: string;
    readonly network: NetworkJson;
}

export enum FormStepType {
    Category,
    Idea,
    Chain,
}

export const initialState: State = {
    activeStep: FormStepType.Category,
    category: 0,
    description: '',
    network: {
        name: 'EOS Localhost',
        protocol: 'https',
        host: '127.0.0.1',
        port: 8889,
        blockchain: 'eos',
        chainId:
            'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f',
    },
};

export type Action =
    | { type: 'next' }
    | { type: 'prev' }
    | { type: 'setCategory'; category: Category }
    | { type: 'setDescription'; description: string };

export function reducer(state: State, action: Action) {
    switch (action.type) {
    case 'next':
        return {
            ...state,
            activeStep: getNextStep(state.activeStep),
        };
    case 'prev':
        return {
            ...state,
            activeStep: getPrevStep(state.activeStep),
        };
    case 'setCategory':
        return {
            ...state,
            category: action.category,
        };
    case 'setDescription':
        return {
            ...state,
            description: action.description,
        };
    }
}

export function getNextStep(step: FormStepType): FormStepType {
    switch (step) {
    case FormStepType.Category:
        return FormStepType.Idea;
    case FormStepType.Idea:
    case FormStepType.Chain:
        return FormStepType.Chain;
    }
}

export function getPrevStep(step: FormStepType): FormStepType {
    switch (step) {
    case FormStepType.Chain:
        return FormStepType.Idea;
    case FormStepType.Idea:
    case FormStepType.Category:
        return FormStepType.Category;
    }
}

export function hasNextStep(step: FormStepType): boolean {
    return step !== FormStepType.Chain;
}

export function hasPrevStep(step: FormStepType): boolean {
    return step !== FormStepType.Category;
}

export const formStepTypes = [
    FormStepType.Category,
    FormStepType.Idea,
    FormStepType.Chain,
];

export function getStepLabel(step: FormStepType): string {
    switch (step) {
    case FormStepType.Category:
        return 'Category';
    case FormStepType.Idea:
        return 'Project Idea';
    case FormStepType.Chain:
        return 'Chain';
    }
}

export async function newProject(state: State) {
    const network = ScatterJS.Network.fromJson(state.network);
    const rpc = new JsonRpc(network.fullhost());

    await (ScatterJS as any).suggestNetwork(network);
    (ScatterJS as any).login({ accounts: [network] }).then((id: any) => {
        const eos: Api = ScatterJS.eos(network, Api, { rpc, beta3: true });
        const account = ScatterJS.account('eos');
        eos.transact(
            {
                actions: [
                    {
                        account: 'dappcontract',
                        name: 'newproject',
                        authorization: [
                            {
                                actor: account.name,
                                permission: account.authority,
                            },
                        ],
                        data: {
                            account: account.name,
                            draft_name: 'abc123',
                            category: 100,
                            description: 'Cool new project',
                        },
                    },
                ],
            },
            {
                blocksBehind: 3,
                expireSeconds: 30,
            },
        )
            .then((res) => {
                // tslint:disable-next-line
                console.log("sent: ", res);
            })
            .catch((err) => {
                // tslint:disable-next-line
                console.error("error: ", err);
            });
        console.warn('BALLS', id);
    });
}
