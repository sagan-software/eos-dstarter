declare namespace ScatterJS {
    export class Network {
        constructor(...args: any[]);
        fullhost(): string;
        unique(): string;
        static fromJson(b: any): Network;
        static placeholder(): Network;
    }

    export interface Network {
        name: string;
        protocol: string;
        host: string;
        port: number;
        blockchain: string;
        chainId: string;
        token?: string;
    }

    export class Plugin {
        constructor(...args: any[]);

        // isSignatureProvider(): any;

        // isValid(): any;

        // static fromJson(b: any): any;

        // static placeholder(): any;
    }

    export function plugins(plugin: Plugin);

    export interface ConnectOptions {
        network?: Network;
    }

    export function connect(
        appName: string,
        options?: ConnectOptions,
    ): Promise<boolean>;

    export function login(): Promise<any>;

    export function account(blockchain: string): any;
}

declare module "scatterjs-core" {
    export = ScatterJS;
}
