import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { Helmet } from 'react-helmet';
import * as Site from '../../components/Site';
import * as Store from '../../store';
import * as Styles from '../../styles';
import CategoryStep from './CategoryStep';
import ChainStep from './ChainStep';
import IdeaStep from './IdeaStep';

export interface Props extends Styles.Props {
    readonly activeStep: Store.StartPage.FormStep;
}

export default Store.connect(
    (state) => ({ activeStep: state.startPage.activeStep }),
    {},
)(
    Styles.withStyles((theme) => ({
        footer: {
            margin: '0 auto',
            maxWidth: '460px',
            opacity: 0.6,
            fontSize: theme.typography.body2.fontSize,
        },
    }))(({ classes, activeStep }: Props) => (
        <Site.Container>
            <Helmet>
                <title>Create your project</title>
            </Helmet>
            <Site.Header>
                <Site.Logo />
            </Site.Header>
            <Site.Main>
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
    )),
);

function getActiveStep(activeStep: Store.StartPage.FormStep) {
    switch (activeStep) {
    case Store.StartPage.FormStep.Category:
        return <CategoryStep />;
    case Store.StartPage.FormStep.Idea:
        return <IdeaStep />;
    case Store.StartPage.FormStep.Chain:
        return <ChainStep />;
    }
}
