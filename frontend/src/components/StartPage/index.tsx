import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import Typography from '@material-ui/core/Typography';
import React, { useCallback } from 'react';
import * as Store from '../../store';
import { makeStyles } from '../../styles';
import * as Site from '../Site';
import CategoryStep from './CategoryStep';
import ChainStep from './ChainStep';
import IdeaStep from './IdeaStep';
import SubmitStep from './SubmitStep';

const useStyles = makeStyles((theme) => ({
    siteHeader: {
        borderBottomWidth: 0,
    },
    siteMain: {
        maxWidth: '960px',
        margin: '0 auto',
        width: '100%',
    },
    footer: {
        margin: '0 auto',
        maxWidth: '460px',
        opacity: 0.6,
        fontSize: theme.typography.body2.fontSize,
    },
}));

export default function StartPage() {
    const classes = useStyles();
    const activeStep = Store.useMappedState(
        useCallback(Store.StartPage.getActiveStep, []),
    );
    return (
        <Site.Container>
            <Site.Header className={classes.siteHeader}>
                <Site.Logo />
            </Site.Header>
            <Site.Main className={classes.siteMain}>
                <Stepper activeStep={activeStep}>
                    {Store.StartPage.formStepTypes.map((formStepType) => (
                        <Step key={formStepType}>
                            <StepLabel>
                                {Store.StartPage.getStepLabel(formStepType)}
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>
                {getActiveStep(activeStep)}
                <Typography
                    variant='body1'
                    align='center'
                    className={classes.footer}
                >
                    To create a project, you're required to have an account on a
                    supported EOSIO blockchain. Please note: after launch, your
                    ability to edit, hide, or delete a project is limited.
                </Typography>
            </Site.Main>
        </Site.Container>
    );
}

function getActiveStep(activeStep: Store.StartPage.FormStep) {
    switch (activeStep) {
    case Store.StartPage.FormStep.Category:
        return <CategoryStep />;
    case Store.StartPage.FormStep.Idea:
        return <IdeaStep />;
    case Store.StartPage.FormStep.Chain:
        return <ChainStep />;
    case Store.StartPage.FormStep.Submit:
        return <SubmitStep />;
    }
}
