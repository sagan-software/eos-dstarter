declare class ScatterEOS implements ScatterJS.Plugin {}

declare module "scatterjs-plugin-eosjs2" {
    export = ScatterEOS;
}

declare namespace ScatterJS {
    import eosjs from "../../node_modules/eosjs/dist";

    export function eos(network: any, api: any, options: any): eosjs.Api;
}
