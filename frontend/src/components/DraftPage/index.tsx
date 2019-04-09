import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import ArrowRight from '@material-ui/icons/ArrowRight';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { match as RouterMatch } from 'react-router-dom';
import * as Store from '../../store';
import { makeStyles } from '../../styles';
import * as Page from '../Page';
import * as Site from '../Site';

const useStyles = makeStyles((theme) => ({
    appLogo: {
        flex: 'unset',
    },
    navLinks: {
        flex: 1,
        paddingLeft: theme.spacing(3),
        display: 'flex',
        alignItems: 'center',
    },
    navLink: {
        margin: theme.spacing(1),
    },
    navSep: {
        opacity: 0.1,
    },
    stepTitle: {},
    stepSubtitle: {
        opacity: 0.6,
    },
    exitToOverview: {},
    pageHeader: {
        minHeight: '200px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    pageFooter: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100vw',
        display: 'flex',
        justifyContent: 'flex-end',
        padding: theme.spacing(3),
        backgroundColor: theme.palette.grey[50],
    },
    prevButton: {
        backgroundColor: theme.palette.common.white,
        paddingLeft: theme.spacing(7),
        paddingRight: theme.spacing(7),
    },
    nextButton: {
        marginLeft: theme.spacing(2),
        paddingLeft: theme.spacing(7),
        paddingRight: theme.spacing(7),
    },
}));

export interface Params {
    readonly chainIdPrefix: string;
    readonly accountName: string;
    readonly draftName: string;
}

export interface Props {
    readonly match: RouterMatch<Params>;
}

export default function DraftPage({ match }: Props) {
    const dispatch = Store.useDispatch();
    useEffect(() => {
        dispatch<Store.DraftPage.Load>({
            type: Store.DraftPage.Type.Load,
            chainIdPrefix: match.params.chainIdPrefix,
            accountName: match.params.accountName,
            draftName: match.params.draftName,
        });
    }, []);
    const classes = useStyles();
    const NavSep = <ArrowRight className={classes.navSep} />;
    return (
        <Site.Container>
            <Site.Header>
                <Site.Logo className={classes.appLogo} />
                <nav className={classes.navLinks}>
                    <Link className={classes.navLink} href='#' variant='body1'>
                        Basics
                    </Link>
                    {NavSep}
                    <Link className={classes.navLink} href='#' variant='body1'>
                        Rewards
                    </Link>
                    {NavSep}
                    <Link className={classes.navLink} href='#' variant='body1'>
                        Story
                    </Link>
                    {NavSep}
                    <Link className={classes.navLink} href='#' variant='body1'>
                        People
                    </Link>
                    {NavSep}
                    <Link className={classes.navLink} href='#' variant='body1'>
                        Chain
                    </Link>
                </nav>
                <Link
                    href='#'
                    variant='body1'
                    className={classes.exitToOverview}
                >
                    Exit to Project Overview
                </Link>
            </Site.Header>
            <Site.Main>
                <Page.Header className={classes.pageHeader}>
                    <Page.Title>Start with the basics</Page.Title>
                    <Page.Subtitle>
                        Make it easy for people to learn about your project
                    </Page.Subtitle>
                </Page.Header>
                <footer className={classes.pageFooter}>
                    <Button
                        variant='outlined'
                        size='large'
                        classes={{ root: classes.prevButton }}
                    >
                        Preview
                    </Button>
                    <Button
                        variant='contained'
                        color='primary'
                        size='large'
                        classes={{ root: classes.nextButton }}
                    >
                        Next: Rewards
                    </Button>
                </footer>
            </Site.Main>
        </Site.Container>
    );
}
