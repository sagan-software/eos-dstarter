import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import React, { useCallback } from 'react';
import * as Route from '../../route';
import * as Store from '../../store';
import * as Site from '../Site';
import * as Form from './FormStep';

export default function SubmitStep() {
    const summary = Store.useMappedState(
        useCallback(Store.StartPage.getSubmitSummary, []),
    );

    switch (summary.status) {
    case Store.StartPage.SubmitStatus.Ok:
        return <SubmitOk summary={summary} />;
    case Store.StartPage.SubmitStatus.Err:
        return <SubmitErr summary={summary} />;
    case Store.StartPage.SubmitStatus.Submitting:
        return <Submitting summary={summary} />;
    }
}

interface SubmittingProps {
    summary: Store.StartPage.SubmitSummarySubmitting;
}

function Submitting({ summary }: SubmittingProps) {
    return (
        <Form.Container>
            <Form.Title>Creating project...</Form.Title>
            <Form.Subtitle>{summary.message}</Form.Subtitle>
            <CircularProgress
                variant='determinate'
                value={summary.percent * 100}
            />
        </Form.Container>
    );
}

interface SubmitErrProps {
    summary: Store.StartPage.SubmitSummaryErr;
}

function SubmitErr({ summary }: SubmitErrProps) {
    return (
        <Form.Container>
            <Form.Title>Error creating project.</Form.Title>
            <Form.Subtitle>{summary.message}</Form.Subtitle>
            <CircularProgress
                variant='determinate'
                value={summary.percent * 100}
            />
        </Form.Container>
    );
}

interface SubmitOkProps {
    summary: Store.StartPage.SubmitStateOk;
}

function SubmitOk({ summary }: SubmitOkProps) {
    const chainId = summary.chain.chainId;
    const explorers = Store.useMappedState(
        useCallback(Store.Explorers.getByChainId(chainId), []),
    );
    const explorer = explorers[0];
    const route = Route.draft(
        summary.chain.chainId,
        summary.account.name,
        summary.draftName,
    );
    return (
        <Form.Container>
            <Form.Title>Your project has been created!</Form.Title>
            <Form.Subtitle>
                Transaction ID <code>{summary.transactionId}</code>
            </Form.Subtitle>
            <Site.Button
                to={route}
                variant='contained'
                color='primary'
                size='large'
            >
                Go to project
            </Site.Button>
        </Form.Container>
    );
}
