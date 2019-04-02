import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import ArrowRight from '@material-ui/icons/ArrowRight';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { match as RouterMatch } from 'react-router-dom';
import AppContainer from '../../components/AppContainer';
import AppHeader from '../../components/AppHeader';
import AppLogo from '../../components/AppLogo';
import AppMain from '../../components/AppMain';
import * as draftPageStore from '../../store/draftPage';
import { RootState } from '../../store/root';
import * as rpcServersStore from '../../store/rpcServers';
import styles from '../../styles/draftPage';

export interface Params {
    readonly chainIdPrefix: string;
    readonly accountName: string;
    readonly draftName: string;
}

export interface Props extends WithStyles<typeof styles> {
    readonly state: draftPageStore.DraftPageState;
    readonly match: RouterMatch<Params>;
    readonly loadDraft: any;
    readonly checkAllRpcServers: any;
}

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

function DraftPage({ classes, match, checkAllRpcServers, loadDraft }: Props) {
    useEffect(() => {
        checkAllRpcServers().then(() => {
            return loadDraft(
                match.params.chainIdPrefix,
                match.params.accountName,
                match.params.draftName,
            );
        });
    }, [1]);
    const NavSep = <ArrowRight className={classes.navSep} />;
    return (
        <AppContainer classes={classes}>
            <AppHeader classes={classes}>
                <AppLogo classes={classes} />
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
            </AppHeader>
            <AppMain classes={classes}>
                <header className={classes.pageHeader}>
                    <Title classes={classes}>Start with the basics</Title>
                    <Subtitle classes={classes}>
                        Make it easy for people to learn about your project
                    </Subtitle>
                </header>
                <h2>Draft</h2>
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
            </AppMain>
        </AppContainer>
    );
}

const mapStateToProps = (state: RootState) => ({
    state: state.draftPage,
});

export default withStyles(styles, { withTheme: true })(
    connect(
        mapStateToProps,
        {
            checkAllRpcServers: rpcServersStore.checkAllRpcServers,
            loadDraft: draftPageStore.load,
        },
    )(DraftPage),
);
