import { WithStyles } from '@material-ui/core/styles';
import React from 'react';
import styles from '../styles/appStyles';
import AppContainer from './AppContainer';
import AppFooter from './AppFooter';
import AppHeader from './AppHeader';
import AppLogo from './AppLogo';
import AppMain from './AppMain';
import AppSiteNav from './AppSiteNav';
import AppUserNav from './AppUserNav';

export interface Props extends WithStyles<typeof styles> {
    readonly children?: any;
}

function AppSkeleton({ classes, children }: Props) {
    return (
        <AppContainer classes={classes}>
            <AppHeader classes={classes}>
                <AppSiteNav classes={classes} />
                <AppLogo classes={classes} />
                <AppUserNav classes={classes} />
            </AppHeader>
            <AppMain classes={classes}>{children}</AppMain>
            <AppFooter classes={classes} />
        </AppContainer>
    );
}

export default AppSkeleton;
