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
import React from 'react';
import * as chainsStore from '../../store/chains';
import * as startPage from '../../store/startPage';
import {
    Buttons,
    Container,
    Inner,
    PrevButton,
    SubmitButton,
    Subtitle,
    Title,
} from './FormStep';
import styles from './styles';

export interface ChainStepProps extends WithStyles<typeof styles> {
    readonly value: string;
    readonly setChainId: typeof startPage.setChainId;
    readonly prevStep: typeof startPage.prevStep;
    readonly chains: chainsStore.ChainsState;
}

function ChainStep({
    classes,
    value,
    setChainId,
    prevStep,
    chains,
}: ChainStepProps) {
    return (
        <Container classes={classes}>
            <Title classes={classes}>
                Finally, select a blockchain to use.
            </Title>
            <Subtitle classes={classes}>
                Tell us what EOSIO blockchain you’re using before we proceed.
            </Subtitle>
            <Inner classes={classes}>
                <Paper>
                    <List>
                        {/* TODO: No chains */}
                        {Object.values(chains.chains).map((chain) => (
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
                    Category
                </PrevButton>
                <SubmitButton
                    classes={classes}
                    disabled={value.length === 0 || value.length > 135}
                >
                    Continue
                </SubmitButton>
            </Buttons>
        </Container>
    );
}

export default ChainStep;
