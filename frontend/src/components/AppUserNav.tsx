import Link from '@material-ui/core/Link';
import { WithStyles } from '@material-ui/core/styles';
import React from 'react';
import { loginRoute, settingsRoute } from '../routes';
import * as scatterStore from '../store/scatter';
import styles from '../styles/appStyles';
import AppLink from './AppLink';

export interface Props extends WithStyles<typeof styles> {
    readonly scatter: scatterStore.ScatterState;
    readonly logout: any;
}

function AppUserNav({ classes, scatter, logout }: Props) {
    const identity =
        scatter.type === scatterStore.ScatterStateType.Connected &&
        scatter.identity.type === scatterStore.IdentityStateType.LoggedIn
            ? scatter.identity
            : null;
    return (
        <nav className={classes.appUserNav}>
            <AppLink to={settingsRoute()} variant='body1'>
                Settings
            </AppLink>
            {identity ? loggedIn(identity, logout) : loggedOut()}
        </nav>
    );
}

function loggedOut() {
    return (
        <AppLink to={loginRoute()} variant='body1'>
            Login
        </AppLink>
    );
}

function loggedIn(identity: scatterStore.LoggedInState, logout: any) {
    return (
        <Link
            href='#logout'
            variant='body1'
            onClick={(e: any) => {
                e.preventDefault();
                logout();
            }}
        >
            Logout
        </Link>
    );
}

export default AppUserNav;
