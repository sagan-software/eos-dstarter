import { WithStyles } from '@material-ui/core/styles';
import Settings from '@material-ui/icons/Settings';
import React from 'react';
import { loginRoute, settingsRoute } from '../routes';
import styles from '../styles/appStyles';
import AppLink from './AppLink';

export interface Props extends WithStyles<typeof styles> {}

function AppUserNav({ classes }: Props) {
    return (
        <nav className={classes.appUserNav}>
            <AppLink to={settingsRoute()} variant='body1'>
                Settings
            </AppLink>
            <AppLink to={loginRoute()} variant='body1'>
                Login
            </AppLink>
        </nav>
    );
}

export default AppUserNav;
