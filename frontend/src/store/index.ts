import { Action, applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware, { ThunkAction } from 'redux-thunk';
import { chainsReducer } from './chains';
import { draftPageReducer } from './draftPage';
import { rpcServersReducer } from './rpcServers';
import { scatterReducer } from './scatter';
import { startPageReducer } from './startPage';

const rootReducer = combineReducers({
    scatter: scatterReducer,
    startPage: startPageReducer,
    chains: chainsReducer,
    draftPage: draftPageReducer,
    rpcServers: rpcServersReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export type AppThunkResult<R, A extends Action<any>> = ThunkAction<
    R,
    AppState,
    null,
    A
>;

export default function configureStore() {
    const middlewares = [thunkMiddleware];
    const middleWareEnhancer = applyMiddleware(...middlewares);

    return createStore(rootReducer, composeWithDevTools(middleWareEnhancer));
}
