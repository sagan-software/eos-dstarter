export * from './action';
export * from './reducer';
export * from './state';
export * from './sagas';
export * from './selectors';

import Scatter from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs2';
Scatter.plugins(new ScatterEOS());

(window as any).Scatter = Scatter;
