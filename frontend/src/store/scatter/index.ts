export * from './actionThunks';
export * from './actionTypes';
export * from './stateReducer';
export * from './stateTypes';

import Scatter from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs2';
Scatter.plugins(new ScatterEOS());
