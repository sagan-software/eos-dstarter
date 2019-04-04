import { Fade } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import React from 'react';
import * as Store from '../../store';
import styles from '../../styles/startPage';

export interface TitleProps extends WithStyles<typeof styles> {
    readonly children?: any;
}

export function Title(props: TitleProps) {
    return (
        <Typography
            variant='h4'
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
            variant='body1'
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
    readonly prevStep: typeof Store.StartPage.prevStep;
}

export function PrevButton(props: PrevButtonProps) {
    return (
        <Button onClick={() => props.prevStep()}>
            <KeyboardArrowLeft />
            {props.children}
        </Button>
    );
}

export interface NextButtonProps extends WithStyles<typeof styles> {
    readonly children?: any;
    readonly disabled?: boolean;
    readonly nextStep: typeof Store.StartPage.nextStep;
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
    return (
        <Fade in>
            <div className={props.classes.stepContainer}>{props.children}</div>
        </Fade>
    );
}

export function Buttons(props: DivProps) {
    return <div className={props.classes.stepButtons}>{props.children}</div>;
}

export function Inner(props: DivProps) {
    return <div className={props.classes.stepInner}>{props.children}</div>;
}
