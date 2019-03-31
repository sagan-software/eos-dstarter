import Button from '@material-ui/core/Button';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ArrowBack from '@material-ui/icons/ArrowBack';
import React from 'react';
import * as startPage from '../../store/startPage';
import styles from './styles';

export interface TitleProps extends WithStyles<typeof styles> {
    readonly children?: any;
}

export function Title(props: TitleProps) {
    return (
        <Typography
            variant='headline'
            align='center'
            className={props.classes.stepTitle}
            gutterBottom
        >
            {props.children}
        </Typography>
    );
}

export function Subtitle(props: TitleProps) {
    return (
        <Typography
            variant='subheading'
            align='center'
            className={props.classes.stepSubtitle}
            gutterBottom
        >
            {props.children}
        </Typography>
    );
}

export interface PrevButtonProps extends WithStyles<typeof styles> {
    readonly children?: any;
    readonly prevStep: typeof startPage.prevStep;
}

export function PrevButton(props: PrevButtonProps) {
    return (
        <Button onClick={() => props.prevStep()}>
            <ArrowBack />
            {props.children}
        </Button>
    );
}

export interface NextButtonProps extends WithStyles<typeof styles> {
    readonly children?: any;
    readonly disabled?: boolean;
    readonly nextStep: typeof startPage.nextStep;
}

export function NextButton(props: NextButtonProps) {
    return (
        <Button
            variant='contained'
            color='primary'
            disabled={props.disabled}
            onClick={(e) => props.nextStep()}
        >
            {props.children}
        </Button>
    );
}

export interface SubmitButtonProps extends WithStyles<typeof styles> {
    readonly children?: any;
    readonly disabled?: boolean;
    readonly submit?: any;
}

export function SubmitButton(props: SubmitButtonProps) {
    return (
        <Button
            variant='contained'
            color='primary'
            disabled={props.disabled}
            onClick={props.submit}
        >
            {props.children}
        </Button>
    );
}

export interface DivProps extends WithStyles<typeof styles> {
    readonly children?: any;
}

export function Container(props: DivProps) {
    return <div className={props.classes.stepContainer}>{props.children}</div>;
}

export function Buttons(props: DivProps) {
    return <div className={props.classes.stepButtons}>{props.children}</div>;
}

export function Inner(props: DivProps) {
    return <div className={props.classes.stepInner}>{props.children}</div>;
}
