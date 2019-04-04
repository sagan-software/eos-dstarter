import * as ReactRedux from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
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

export function configureStore() {
    const middlewares = [thunkMiddleware];
    const middleWareEnhancer = applyMiddleware(...middlewares);
    return createStore(
        Root.reducer,
        composeWithDevTools({ name: 'weos.fund' })(middleWareEnhancer),
    );
}

export type MapStateToProps<
    TStateProps,
    TOwnProps
> = ReactRedux.MapStateToPropsParam<TStateProps, TOwnProps, Root.State>;

export type MapDispatchToProps<
    TDispatchProps,
    TOwnProps
> = ReactRedux.MapDispatchToPropsParam<TDispatchProps, TOwnProps>;

export const connect = <TStateProps, TDispatchProps, TOwnProps>(
    mapStateToProps: MapStateToProps<TStateProps, TOwnProps>,
    mapDispatchToProps: TDispatchProps,
) => ReactRedux.connect(mapStateToProps, mapDispatchToProps);
