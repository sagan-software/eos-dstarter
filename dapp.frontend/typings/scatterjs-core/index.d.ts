declare namespace ScatterJS {
    export class Network {
        constructor(...args: any[]);
        public fullhost(): string;
        public unique(): string;
        public static fromJson(b: NetworkJson): Network;
        public static placeholder(): Network;
    }

    export interface NetworkJson {
        name: string;
        protocol: string;
        host: string;
        port: number;
        blockchain: string;
        chainId: string;
        token?: string;
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

declare module 'scatterjs-core' {
    export = ScatterJS;
}
