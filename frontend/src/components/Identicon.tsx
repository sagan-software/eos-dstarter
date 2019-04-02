import IdenticonJS, { IdenticonOptions } from 'identicon.js';
import React from 'react';

export interface Props extends IdenticonOptions {
    readonly hash: string;
}

function Identicon({ hash, ...props }: Props) {
    const ident = new IdenticonJS(hash.padEnd(15), props);
    const mimeType = props.format === 'svg' ? 'svg+xml' : 'png';
    const base64 = ident.toString();
    const src = `data:image/${mimeType};base64,${base64}`;
    return <img src={src} />;
}

export default Identicon;
