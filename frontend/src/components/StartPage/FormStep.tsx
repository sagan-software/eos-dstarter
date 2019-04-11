import { Fade } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import React, { useCallback } from 'react';
import * as Store from '../../store';
import { makeStyles } from '../../styles';

const useStyles = makeStyles((theme) => ({
    appHeader: {
        borderBottomWidth: 0,
    },
    appMain: {
        maxWidth: '960px',
        margin: '0 auto',
        width: '100%',
    },
    stepper: {
        background: 'transparent',
    },
    stepContainer: {
        maxWidth: '500px',
        marginTop: theme.spacing(6),
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    stepTitle: {},
    stepSubtitle: {
        opacity: 0.6,
    },
    stepInner: {
        margin: theme.spacing(5),
        marginLeft: 0,
        marginRight: 0,
    },
    stepButtons: {
        margin: theme.spacing(5),
        marginLeft: 0,
        marginRight: 0,
        display: 'flex',
        justifyContent: 'space-between',
    },
    categorySelectMenu: {
        padding: theme.spacing(2),
        fontSize: theme.typography.h6.fontSize,
    },
    categorySelectIcon: {
        right: theme.spacing(2),
    },
}));

export interface Props
    extends React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
    > {}

export function Title(props: Props) {
    const classes = useStyles();
    return (
        <Typography
            variant='h4'
            align='center'
            className={classes.stepTitle}
            gutterBottom
        >
            {props.children}
        </Typography>
    );
}

export function Subtitle(props: Props) {
    const classes = useStyles();
    return (
        <Typography
            variant='body1'
            align='center'
            className={classes.stepSubtitle}
            gutterBottom
        >
            {props.children}
        </Typography>
    );
}

export function PrevButton(props: Props) {
    // const classes = useStyles();
    const dispatch = Store.useDispatch();
    const onClick = useCallback(() => {
        dispatch<Store.StartPage.PrevStep>({
            type: Store.StartPage.Type.PrevStep,
        });
    }, []);
    return (
        <Button onClick={onClick}>
            <KeyboardArrowLeft />
            {props.children}
        </Button>
    );
}

export interface NextButtonProps extends Props {
    readonly disabled?: boolean;
}

export function NextButton(props: NextButtonProps) {
    const dispatch = Store.useDispatch();
    const onClick = useCallback(() => {
        dispatch<Store.StartPage.NextStep>({
            type: Store.StartPage.Type.NextStep,
        });
    }, []);
    return (
        <Button
            variant='contained'
            color='primary'
            disabled={props.disabled}
            onClick={onClick}
        >
            {props.children}
        </Button>
    );
}

export function Container(props: Props) {
    const classes = useStyles();
    return (
        <Fade in>
            <div className={classes.stepContainer}>{props.children}</div>
        </Fade>
    );
}

export function Buttons(props: Props) {
    const classes = useStyles();
    return <div className={classes.stepButtons}>{props.children}</div>;
}

export function Inner(props: Props) {
    const classes = useStyles();
    return <div className={classes.stepInner}>{props.children}</div>;
}
