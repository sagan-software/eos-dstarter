import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import ArrowRight from '@material-ui/icons/ArrowRight';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { match as RouterMatch } from 'react-router-dom';
import * as Site from '../../components/Site';
import * as Store from '../../store';
import styles from '../../styles/draftPage';

export interface Params {
    readonly chainIdPrefix: string;
    readonly accountName: string;
    readonly draftName: string;
}

export interface Props extends WithStyles<typeof styles> {
    readonly state: Store.DraftPage.State;
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
        <Site.Container classes={classes}>
            <Site.Header classes={classes}>
                <Site.Logo classes={classes} />
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
            <Site.Main classes={classes}>
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
            </Site.Main>
        </Site.Container>
    );
}

const mapStateToProps = (state: Store.Root.State) => ({
    state: state.draftPage,
});

export default withStyles(styles, { withTheme: true })(
    connect(
        mapStateToProps,
        {
            checkAllRpcServers: Store.RpcServers.checkAll,
            loadDraft: Store.DraftPage.load,
        },
    )(DraftPage),
);
