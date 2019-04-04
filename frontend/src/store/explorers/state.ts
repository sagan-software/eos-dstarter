import { Template as UrlTemplate } from 'url-template';

export interface State {
    [host: string]: Explorer;
}

export interface Explorer {
    readonly displayName: string;
    readonly host: string;
    readonly chainId: string;
    readonly account: UrlTemplate<{ name: string }>;
    readonly transaction: UrlTemplate<{ id: string }>;
    readonly block: UrlTemplate<{ num: number }>;
}

// TODO eosx.io
// TODO kylin.eosx.io
// TODO jungle.eosx.io
// TODO bos.eosx.io
// TODO bos-test.eosx.io
// TODO meetone.eosx.io
// TODO meetone-test.eosx.io
// TODO worbli.eosx.io
// TODO telos.eosx.io
// TODO telos-test.eosx.io
// TODO eosq.app
// TODO kylin.eosq.app
// TODO jungle.eosq.app
// TODO bloks.io
// TODO jungle.bloks.io
// TODO kylin.bloks.io
// TODO worbli.bloks.io
// TODO bos.bloks.io
// TODO eosflare.io
// TODO eospark.com
// TODO jungle.eospark.com
// TODO kylin.eospark.com
// TODO bos.eospark.com
