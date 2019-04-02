import CircularProgress from '@material-ui/core/CircularProgress';
import Link from '@material-ui/core/Link';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { getRouteTemplate, RouteType } from '../routes';
import * as appStore from '../store/app';
import { RootState } from '../store/root';
import styles from '../styles/appStyles';
import AppContainer from './AppContainer';
import AppHeader from './AppHeader';
import AppLogo from './AppLogo';
import AppMain from './AppMain';

export interface Props extends WithStyles<typeof styles> {}

function AppLoading({ classes }: Props) {
    return (
        <AppContainer classes={classes}>
            <AppHeader classes={classes}>
                <Link
                    href='#'
                    className={classes.appLogo}
                    color='primary'
                    underline='none'
                >
                    WEOS.FUND
                </Link>
            </AppHeader>
            <AppMain classes={classes}>
                <CircularProgress size={100} />
            </AppMain>
        </AppContainer>
    );
}

export default withStyles(styles, { withTheme: true })(AppLoading);
