import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ArrowBack from '@material-ui/icons/ArrowBack';
import React from 'react';
import {
    Action,
    FormStepType,
    getNextStep,
    getPrevStep,
    getStepLabel,
    hasNextStep,
    hasPrevStep,
} from './state';

const styles = (theme: Theme) => ({
    container: {
        maxWidth: '460px',
        margin: theme.spacing.unit * 6,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    headline: {},
    subheading: {},
    inner: {
        margin: theme.spacing.unit * 3,
        marginLeft: 0,
        marginRight: 0,
    },
    buttons: {
        margin: theme.spacing.unit * 3,
        marginLeft: 0,
        marginRight: 0,
        display: 'flex',
        justifyContent: 'space-between',
    },
});

export interface FormStepProps extends WithStyles<typeof styles> {
    readonly headline: string;
    readonly subheading: string;
    readonly dispatch: React.Dispatch<Action>;
    readonly activeStep: FormStepType;
    readonly nextDisabled: boolean;
    readonly children: any;
}

function FormStep(props: FormStepProps) {
    return (
        <div className={props.classes.container}>
            <Typography
                variant='headline'
                align='center'
                className={props.classes.headline}
                gutterBottom
            >
                {props.headline}
            </Typography>
            <Typography
                variant='subheading'
                align='center'
                className={props.classes.subheading}
                gutterBottom
            >
                {props.subheading}
            </Typography>
            <div className={props.classes.inner}>{props.children}</div>
            <div className={props.classes.buttons}>
                {hasPrevStep(props.activeStep) ? (
                    <Button onClick={() => props.dispatch({ type: 'prev' })}>
                        <ArrowBack />
                        {getStepLabel(getPrevStep(props.activeStep))}
                    </Button>
                ) : (
                    <div />
                )}
                <Button
                    variant='contained'
                    color='primary'
                    disabled={props.nextDisabled}
                    onClick={(e) => props.dispatch({ type: 'next' })}
                >
                    {hasNextStep(props.activeStep)
                        ? `Next: ${getStepLabel(getNextStep(props.activeStep))}`
                        : 'Continue'}
                </Button>
            </div>
        </div>
    );
}

export default withStyles(styles, { withTheme: true })(FormStep);
