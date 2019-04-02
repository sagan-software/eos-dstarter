import { WithStyles } from '@material-ui/core/styles';
import React from 'react';
import { exploreRoute, startRoute } from '../routes';
import styles from '../styles/appStyles';
import AppLink from './AppLink';

export interface Props extends WithStyles<typeof styles> {}

function AppSiteNav({ classes }: Props) {
    return (
        <nav className={classes.appSiteNav}>
            <AppLink to={exploreRoute()} variant='body1'>
                Explore
            </AppLink>
            <AppLink to={startRoute()} variant='body1'>
                Start a project
            </AppLink>
        </nav>
    );
}

export default AppSiteNav;
