import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';
import * as Store from '../../store';
import { makeStyles } from '../../styles';
import * as Page from '../Page';
import * as Site from '../Site';

const useStyles = makeStyles((theme) => {
    return {
        heading: {
            fontSize: theme.typography.pxToRem(15),
            flexBasis: '33.33%',
            flexShrink: 0,
        },
        secondaryHeading: {
            fontSize: theme.typography.pxToRem(15),
            color: theme.palette.text.secondary,
        },
        container: {
            maxWidth: '960px',
            margin: '0 auto',
        },
    };
});

export default function SettingsPage() {
    const classes = useStyles();
    return (
        <Site.Skeleton>
            <Page.Header>
                <Page.Title>Settings</Page.Title>
            </Page.Header>
            <div className={classes.container}>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.heading}>
                            Chains
                        </Typography>
                        <Typography className={classes.secondaryHeading}>
                            I am an expansion panel
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                            Nulla facilisi. Phasellus sollicitudin nulla et quam
                            mattis feugiat. Aliquam eget maximus est, id
                            dignissim quam.
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.heading}>
                            RPC Servers
                        </Typography>
                        <Typography className={classes.secondaryHeading}>
                            You are currently not an owner
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                            Donec placerat, lectus sed mattis semper, neque
                            lectus feugiat lectus, varius pulvinar diam eros in
                            elit. Pellentesque convallis laoreet laoreet.
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.heading}>
                            IPFS Servers
                        </Typography>
                        <Typography className={classes.secondaryHeading}>
                            Filtering has been entirely disabled for whole web
                            server
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                            Nunc vitae orci ultricies, auctor nunc in, volutpat
                            nisl. Integer sit amet egestas eros, vitae egestas
                            augue. Duis vel est augue.
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.heading}>
                            Block Explorers
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                            Nunc vitae orci ultricies, auctor nunc in, volutpat
                            nisl. Integer sit amet egestas eros, vitae egestas
                            augue. Duis vel est augue.
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.heading}>
                            Contract
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                            Nunc vitae orci ultricies, auctor nunc in, volutpat
                            nisl. Integer sit amet egestas eros, vitae egestas
                            augue. Duis vel est augue.
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        </Site.Skeleton>
    );
}
