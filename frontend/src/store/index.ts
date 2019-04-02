import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { rootReducer } from './root';

export default function configureStore() {
    const middlewares = [thunkMiddleware];
    const middleWareEnhancer = applyMiddleware(...middlewares);
    return createStore(
        rootReducer,
        composeWithDevTools({ name: 'weos.fund' })(middleWareEnhancer),
    );
}
