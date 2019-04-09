import * as Chains from '../chains';
import * as Root from '../root';
import * as RpcServers from '../rpcServers';
import * as Scatter from '../scatter';
import * as State from './state';

export const getActiveStep = (state: Root.State) => state.startPage.activeStep;

export const getCategory = (state: Root.State) => state.startPage.category;

export const getDescription = (state: Root.State) =>
    state.startPage.description;

export const getChainId = (state: Root.State) => state.startPage.chainId;

export const getChain = (state: Root.State) =>
    Chains.getById(getChainId(state))(state);

export const getRpcServer = (state: Root.State) =>
    RpcServers.getBestByChainId(getChainId(state))(state);

export const getSubmitState = (state: Root.State) => state.startPage.submit;

export const getSubmitSummary = (state: Root.State): State.SubmitSummary => {
    const scatter = state.scatter;
    const submit = state.startPage.submit;

    switch (scatter.status) {
    case Scatter.Status.Default:
    case Scatter.Status.Connecting:
        return {
            status: State.SubmitStatus.Submitting,
            percent: 0,
            message: 'Connecting to Scatter...',
        };
    case Scatter.Status.Unavailable:
        return {
            status: State.SubmitStatus.Err,
            percent: 0,
            message: 'Error connecting to Scatter.',
        };
    }

    switch (scatter.identity.status) {
    case Scatter.IdentityStatus.LoggedOut:
    case Scatter.IdentityStatus.LoggingIn:
    case Scatter.IdentityStatus.LoggingOut:
        return {
            status: State.SubmitStatus.Submitting,
            percent: 1 / 3,
            message: 'Logging in with Scatter...',
        };
    case Scatter.IdentityStatus.LoginError:
        return {
            status: State.SubmitStatus.Err,
            percent: 1 / 3,
            message: 'Error logging in with Scatter.',
        };
    }

    switch (submit.status) {
    case State.SubmitStatus.Default:
    case State.SubmitStatus.Submitting:
        return {
            status: State.SubmitStatus.Submitting,
            percent: 2 / 3,
            message: 'Sending transaction...',
        };
    case State.SubmitStatus.Err:
        return {
            status: State.SubmitStatus.Err,
            percent: 2 / 3,
            message: 'Error sending transaction.',
        };
    case State.SubmitStatus.Ok:
        return submit;
    }
};
