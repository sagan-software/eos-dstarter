import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import RadioButtonChecked from '@material-ui/icons/RadioButtonChecked';
import RadioButtonUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import React from 'react';
import FormStep from './FormStep';
import { Action, FormStepType } from './state';

export interface ChainStepProps {
    readonly dispatch: React.Dispatch<Action>;
}

function ChainStep({ dispatch }: ChainStepProps) {
    return (
        <FormStep
            activeStep={FormStepType.Chain}
            headline='Finally, select a blockchain to use.'
            subheading='Tell us what EOSIO blockchain you’re using before we proceed.'
            dispatch={dispatch}
            nextDisabled={false}
        >
            <Paper>
                <List>
                    <ListItem button>
                        <ListItemIcon>
                            <RadioButtonChecked />
                        </ListItemIcon>
                        <ListItemText primary='EOS Devnet' />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <RadioButtonChecked />
                        </ListItemIcon>
                        <ListItemText primary='EOS Mainnet' />
                    </ListItem>
                    <Divider />
                    <ListItem button>
                        <ListItemIcon>
                            <RadioButtonUnchecked />
                        </ListItemIcon>
                        <ListItemText primary='Telos Mainnet' />
                    </ListItem>
                    <Divider />
                    <ListItem button>
                        <ListItemIcon>
                            <RadioButtonUnchecked />
                        </ListItemIcon>
                        <ListItemText primary='Worbli Mainnet' />
                    </ListItem>
                </List>
            </Paper>
        </FormStep>
    );
}

export default ChainStep;
