import { WithStyles } from '@material-ui/core/styles';
import React from 'react';
import { homeRoute } from '../routes';
import styles from '../styles/appStyles';
import AppLink from './AppLink';

export interface Props extends WithStyles<typeof styles> {}

function AppLogo({ classes }: Props) {
    return (
        <AppLink
            className={classes.appLogo}
            to={homeRoute()}
            color='primary'
            underline='none'
        >
            WEOS.FUND
        </AppLink>
    );
}

export default AppLogo;
