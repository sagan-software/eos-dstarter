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
