import { Button, Fade } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import React, { useCallback } from 'react';
import * as Store from '../../store';
import ChainsList from '../ChainsList';
import * as Page from '../Page';
import * as Site from '../Site';

export default function LoginPage() {
    const status = Store.useMappedState(
        useCallback(Store.Scatter.getStatus, []),
    );
    switch (status) {
    case Store.Scatter.Status.Default:
    case Store.Scatter.Status.Connecting:
        return <Connecting />;
    case Store.Scatter.Status.Connected:
        return <Connected />;
    case Store.Scatter.Status.Unavailable:
        return <Unavailable />;
    }
}

function Connecting() {
    return (
        <Site.Skeleton>
            <Site.TopCategories />
            <Page.Header>
                <Page.Title>Connecting to Scatter...</Page.Title>
            </Page.Header>
            <div>
                <CircularProgress variant='indeterminate' size={100} />
            </div>
        </Site.Skeleton>
    );
}

function Connected() {
    const dispatch = Store.useDispatch();
    const { selected, chains } = Store.useMappedState(
        useCallback(
            (state) => ({
                selected: Store.LoginPage.getSelected(state),
                chains: Store.Chains.getAll(state),
            }),
            [],
        ),
    );
    const onClick = useCallback((chain: Store.Chains.Chain) => {
        dispatch<Store.LoginPage.ToggleChain>({
            type: Store.LoginPage.Type.ToggleChain,
            chainId: chain.chainId,
        });
    }, []);
    const login = useCallback(() => {
        dispatch<Store.Scatter.Login>({
            type: Store.Scatter.Type.Login,
            options: {
                accounts: selected.reduce((acc: any, cur) => {
                    acc.push({
                        chainId: cur,
                        blockchain: 'eos',
                    });
                    return acc;
                }, []),
            },
        });
    }, [selected]);
    return (
        <Site.Skeleton>
            <Site.TopCategories />
            <Page.Header>
                <Page.Title>Login with Scatter</Page.Title>
                <Page.Subtitle>Select one or more chains</Page.Subtitle>
            </Page.Header>
            <div>
                <ChainsList
                    selected={selected}
                    chains={chains}
                    onClick={onClick}
                />
            </div>
            <Button variant='contained' onClick={login} color='primary'>
                Login
            </Button>
        </Site.Skeleton>
    );
}

function Unavailable() {
    const dispatch = Store.useDispatch();
    const retry = useCallback(() => {
        dispatch<Store.Scatter.Connect>({
            type: Store.Scatter.Type.Connect,
            appName: 'weos.fund',
        });
    }, []);
    return (
        <Site.Skeleton>
            <Site.TopCategories />
            <Page.Header>
                <Page.Title>Couldn't connect to Scatter</Page.Title>
            </Page.Header>
            <div>
                <p>Couldn't connect to Scatter.</p>
                <Button variant='contained' onClick={retry} color='primary'>
                    Retry
                </Button>
            </div>
        </Site.Skeleton>
    );
}
