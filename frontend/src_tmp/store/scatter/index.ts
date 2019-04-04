export * from './thunk';
export { reducer } from './reducer';
export * from './state';

import Scatter from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs2';
Scatter.plugins(new ScatterEOS());
