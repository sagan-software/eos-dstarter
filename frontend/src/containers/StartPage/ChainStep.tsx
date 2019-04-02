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
import { draftRoute, getRouteString } from '../../routes';
import * as chainsStore from '../../store/chains';
import * as rpcServersStore from '../../store/rpcServers';
import * as scatterStore from '../../store/scatter';
import * as startPageStore from '../../store/startPage';
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
    readonly setChainId: typeof startPageStore.setChainId;
    readonly prevStep: typeof startPageStore.prevStep;
    readonly submitState: startPageStore.SubmitState;
    readonly chains: chainsStore.ChainsState;
    readonly submit: any;
    readonly scatterLogin: any;
    readonly checkAllRpcServers: any;
    readonly scatter: scatterStore.ScatterState;
    readonly rpcServers: rpcServersStore.RpcServersState;
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
                s.status === rpcServersStore.RpcServerStatus.Okay &&
                s.chainId === selectedChain.chainId,
        )
        .sort((a, b) => {
            if (
                a.status === rpcServersStore.RpcServerStatus.Okay &&
                b.status === rpcServersStore.RpcServerStatus.Okay
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
            rpcServer.status === rpcServersStore.RpcServerStatus.Okay
        ) {
            if (scatter.type === scatterStore.ScatterStateType.Connected) {
                if (
                    scatter.identity.type ===
                    scatterStore.IdentityStateType.LoggedIn
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
            {submitState.type === startPageStore.SubmitStateType.SubmitOk ? (
                <Redirect
                    to={getRouteString(
                        draftRoute(
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
                        submitState.type !==
                            startPageStore.SubmitStateType.NotSubmitted
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
