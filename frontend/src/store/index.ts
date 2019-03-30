import { applyMiddleware, combineReducers, createStore } from 'redux';
import composeWithDevTools from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { chainsReducer } from './chains';
import { scatterReducer } from './scatter';
import { startPageReducer } from './startPage';

const rootReducer = combineReducers({
    scatter: scatterReducer,
    startPage: startPageReducer,
    chains: chainsReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
    const middlewares = [thunkMiddleware];
    const middleWareEnhancer = applyMiddleware(...middlewares);

    return createStore(rootReducer, middleWareEnhancer);
}
