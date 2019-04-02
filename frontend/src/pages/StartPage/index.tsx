import Link from '@material-ui/core/Link';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import AppContainer from '../../components/AppContainer';
import AppHeader from '../../components/AppHeader';
import AppLogo from '../../components/AppLogo';
import AppMain from '../../components/AppMain';
import { AppState } from '../../store';
import * as chainsStore from '../../store/chains';
import * as rpcServersStore from '../../store/rpcServers';
import * as scatterStore from '../../store/scatter';
import * as startPageStore from '../../store/startPage';
import styles from '../../styles/startPage';
import CategoryStep from './CategoryStep';
import ChainStep from './ChainStep';
import IdeaStep from './IdeaStep';

export interface Props extends WithStyles<typeof styles> {
    readonly scatter: scatterStore.ScatterState;
    readonly scatterConnect: any;
    readonly scatterLogin: any;
    readonly state: startPageStore.StartPageState;
    readonly nextStep: typeof startPageStore.nextStep;
    readonly prevStep: typeof startPageStore.prevStep;
    readonly setCategory: typeof startPageStore.setCategory;
    readonly setDescription: typeof startPageStore.setDescription;
    readonly setChainId: typeof startPageStore.setChainId;
    readonly submit: any;
    readonly chains: chainsStore.ChainsState;
    readonly rpcServers: rpcServersStore.RpcServersState;
    readonly checkRpcServer: any;
    readonly checkAllRpcServers: any;
}

function StartPage(props: Props) {
    switch (props.scatter.type) {
    case scatterStore.ScatterStateType.Idle:
        props.scatterConnect('DStarter');
    case scatterStore.ScatterStateType.Connecting:
        return <>Loading...</>;
    case scatterStore.ScatterStateType.Connected:
        return <ScatterAvailable {...props} />;
    case scatterStore.ScatterStateType.Unavailable:
        return <ScatterRequired />;
    }
}

function ScatterRequired() {
    return <div>Scatter is required</div>;
}

function ScatterAvailable({ classes, state, ...props }: Props) {
    return (
        <AppContainer classes={classes}>
            <Helmet>
                <title>Create your project</title>
            </Helmet>
            <AppHeader classes={classes}>
                <AppLogo classes={classes} />
            </AppHeader>
            <AppMain classes={classes}>
                <Stepper
                    activeStep={state.activeStep}
                    className={classes.stepper}
                >
                    {startPageStore.formStepTypes.map((formStepType) => (
                        <Step key={formStepType}>
                            <StepLabel>
                                {startPageStore.getStepLabel(formStepType)}
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <ActiveStep state={state} classes={classes} {...props} />
                <Typography
                    variant='body1'
                    align='center'
                    className={classes.footer}
                >
                    To create a project, you're required to have an account on a
                    supported EOSIO blockchain. Please note: after launch, your
                    ability to edit, hide, or delete a project is limited.
                </Typography>
            </AppMain>
        </AppContainer>
    );
}

function ActiveStep(props: Props) {
    switch (props.state.activeStep) {
    case startPageStore.FormStepType.Category:
        return (
                <CategoryStep
                    classes={props.classes}
                    value={props.state.category}
                    setCategory={props.setCategory}
                    nextStep={props.nextStep}
                />
        );
    case startPageStore.FormStepType.Idea:
        return (
                <IdeaStep
                    classes={props.classes}
                    value={props.state.description}
                    setDescription={props.setDescription}
                    prevStep={props.prevStep}
                    nextStep={props.nextStep}
                />
        );
    case startPageStore.FormStepType.Chain:
        return (
                <ChainStep
                    classes={props.classes}
                    value={props.state.chainId}
                    setChainId={props.setChainId}
                    prevStep={props.prevStep}
                    submit={props.submit}
                    submitState={props.state.submitState}
                    chains={props.chains}
                    scatterLogin={props.scatterLogin}
                    scatter={props.scatter}
                    rpcServers={props.rpcServers}
                    checkAllRpcServers={props.checkAllRpcServers}
                />
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    scatter: state.scatter,
    state: state.startPage,
    chains: state.chains,
    rpcServers: state.rpcServers,
});

export default withStyles(styles, { withTheme: true })(
    connect(
        mapStateToProps,
        {
            scatterConnect: scatterStore.connect,
            scatterLogin: scatterStore.login,
            nextStep: startPageStore.nextStep,
            prevStep: startPageStore.prevStep,
            setCategory: startPageStore.setCategory,
            setDescription: startPageStore.setDescription,
            setChainId: startPageStore.setChainId,
            submit: startPageStore.submit,
            checkRpcServer: rpcServersStore.checkRpcServer,
            checkAllRpcServers: rpcServersStore.checkAllRpcServers,
        },
    )(StartPage),
);
