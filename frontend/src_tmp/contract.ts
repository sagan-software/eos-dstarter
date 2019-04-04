import * as Eos from 'eosjs';

export const abi = require('./contract.abi.json');
// import wasm from '../../contract/build/src/contract.wasm';

export function isValidAbi(other: Eos.RpcInterfaces.Abi): boolean {
    return (
        other &&
        other.version === abi.version &&
        other.actions === abi.actions &&
        other.structs === abi.structs &&
        other.tables === abi.tables &&
        other.types === abi.types &&
        other.variants === abi.variants
    );
}
