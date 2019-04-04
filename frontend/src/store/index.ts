import { applyMiddleware, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { create } from 'redux-react-hook';
import thunkMiddleware from 'redux-thunk';
import * as App from './app';
import * as Chains from './chains';
import * as DraftPage from './draftPage';
import * as Projects from './projects';
import * as Root from './root';
import * as RpcServers from './rpcServers';
import * as Scatter from './scatter';
import * as StartPage from './startPage';

export {
    App,
    Chains,
    DraftPage,
    Projects,
    Root,
    RpcServers,
    Scatter,
    StartPage,
};

export function makeStore(): Store<Root.State, Root.Action> {
    const middlewares = [thunkMiddleware];
    const middleWareEnhancer = applyMiddleware(...middlewares);
    return createStore(
        Root.reducer,
        composeWithDevTools({ name: 'weos.fund' })(middleWareEnhancer),
    );
}

export const { StoreContext, useDispatch, useMappedState } = create<
    Root.State,
    Root.Action,
    Store<Root.State, Root.Action>
>();
