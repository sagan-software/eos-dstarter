import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import { WithStyles } from '@material-ui/core/styles';
import RadioButtonChecked from '@material-ui/icons/RadioButtonChecked';
import RadioButtonUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import React, { useEffect } from 'react';
import { Redirect } from 'react-router';
import * as Route from '../../route';
import * as Store from '../../store';
import styles from '../../styles/startPage';
import {
    Buttons,
    Container,
    Inner,
    PrevButton,
    SubmitButton,
    Subtitle,
    Title,
} from './FormStep';

export interface ChainStepProps extends WithStyles<typeof styles> {
    readonly value: string;
    readonly setChainId: typeof Store.StartPage.setChainId;
    readonly prevStep: typeof Store.StartPage.prevStep;
    readonly submitState: Store.StartPage.Submit;
    readonly chains: Store.Chains.State;
    readonly submit: any;
    readonly scatterLogin: any;
    readonly checkAllRpcServers: any;
    readonly scatter: Store.Scatter.State;
    readonly rpcServers: Store.RpcServers.State;
}

function ChainStep({
    classes,
    value,
    setChainId,
    prevStep,
    chains,
    submit,
    submitState,
    scatterLogin,
    scatter,
    rpcServers,
    ...props
}: ChainStepProps) {
    const selectedChain = chains[value];
    const rpcServer = Object.values(rpcServers)
        .filter(
            (s) =>
                s.status === Store.RpcServers.Status.Ok &&
                s.chainId === selectedChain.chainId,
        )
        .sort((a, b) => {
            if (
                a.status === Store.RpcServers.Status.Ok &&
                b.status === Store.RpcServers.Status.Ok
            ) {
                return a.ping - b.ping;
            } else {
                return 0;
            }
        })[0];

    useEffect(() => {
        props.checkAllRpcServers();
    }, [1]);

    console.warn(22222222, { selectedChain, rpcServer, chains });

    function handleSubmit() {
        if (
            selectedChain &&
            rpcServer &&
            rpcServer.status === Store.RpcServers.Status.Ok
        ) {
            if (scatter.status === Store.Scatter.Status.Connected) {
                if (
                    scatter.identity.status ===
                    Store.Scatter.IdentityStatus.LoggedIn
                ) {
                    const account = scatter.identity.accounts.filter(
                        (a) => a.chainId === value,
                    )[0];
                    if (account) {
                        // ready to go
                        return submit(account, selectedChain, rpcServer);
                    } else {
                        // Logout and log back in with this chain id
                        console.warn(
                            'TODO logged in but no account for this chain',
                        );
                    }
                } else {
                    // TODO login
                    return scatterLogin({
                        accounts: [
                            {
                                name: selectedChain.displayName,
                                protocol: rpcServer.protocol,
                                host: rpcServer.host,
                                port: rpcServer.port,
                                blockchain: 'eos',
                                chainId: selectedChain.chainId,
                            },
                        ],
                    });
                }
            } else {
                // TODO not connected
                console.warn('TODO not connected');
            }
        }
    }

    console.warn(3333333333, submitState);

    return (
        <Container classes={classes}>
            {submitState.status === Store.StartPage.Status.SubmitOk ? (
                <Redirect
                    to={Route.getRouteString(
                        Route.draft(
                            submitState.chain.chainId,
                            submitState.account.name,
                            submitState.draftName,
                        ),
                    )}
                />
            ) : (
                <></>
            )}
            <Title classes={classes}>Finally, select a blockchain.</Title>
            <Subtitle classes={classes}>
                Tell us what EOSIO blockchain you’re using before we proceed.
            </Subtitle>
            <Inner classes={classes}>
                <Paper>
                    <List>
                        {/* TODO: No chains */}
                        {Object.values(chains).map((chain) => (
                            <ListItem
                                button
                                key={chain.chainId}
                                onClick={() => setChainId(chain.chainId)}
                            >
                                <ListItemIcon>
                                    {value === chain.chainId ? (
                                        <RadioButtonChecked />
                                    ) : (
                                        <RadioButtonUnchecked />
                                    )}
                                </ListItemIcon>
                                <ListItemText primary={chain.displayName} />
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            </Inner>
            <Buttons classes={classes}>
                <PrevButton classes={classes} prevStep={prevStep}>
                    Project Idea
                </PrevButton>
                <SubmitButton
                    classes={classes}
                    disabled={
                        !selectedChain ||
                        !rpcServer ||
                        submitState.status !==
                            Store.StartPage.Status.NotSubmitted
                    }
                    submit={handleSubmit}
                >
                    Continue
                </SubmitButton>
            </Buttons>
        </Container>
    );
}

export default ChainStep;
