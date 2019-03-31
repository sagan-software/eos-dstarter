export * from './actionCreators';
export * from './actionTypes';
export * from './reducers';
export * from './stateTypes';

import Scatter from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs2';
Scatter.plugins(new ScatterEOS());
