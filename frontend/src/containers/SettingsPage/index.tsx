import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';
import { connect } from 'react-redux';
import AppSkeleton from '../../components/AppSkeleton';
import PageHeader from '../../components/PageHeader';
import PageTitle from '../../components/PageTitle';
import { RootState } from '../../store/root';
import * as scatterStore from '../../store/scatter';
import styles from '../../styles/settingsPage';

export interface Props extends WithStyles<typeof styles> {
    readonly scatter: scatterStore.ScatterState;
    readonly logout: any;
}

function SettingsPage({ classes, ...props }: Props) {
    return (
        <AppSkeleton
            classes={classes}
            scatter={props.scatter}
            logout={props.logout}
        >
            <PageHeader classes={classes}>
                <PageTitle classes={classes}>Settings</PageTitle>
            </PageHeader>
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
                            Advanced settings
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
                            Personal data
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
        </AppSkeleton>
    );
}

const mapStateToProps = (state: RootState) => ({
    scatter: state.scatter,
});

export default withStyles(styles, { withTheme: true })(
    connect(
        mapStateToProps,
        { logout: scatterStore.logout },
    )(SettingsPage),
);
