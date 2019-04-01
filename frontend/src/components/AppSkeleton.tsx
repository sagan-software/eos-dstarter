import { withStyles, WithStyles } from '@material-ui/core/styles';
import React, { Component } from 'react';
import AppFooter from './AppFooter';
import AppHeader from './AppHeader';

const styles = {};

export interface Props extends WithStyles<typeof styles> {
    readonly children?: any;
    readonly hideUserNav?: boolean;
    readonly hideSiteNav?: boolean;
    readonly hideFooter?: boolean;
}

function SiteSkeleton(props: Props) {
    return (
        <div>
            <AppHeader
                hideUserNav={!!props.hideUserNav}
                hideSiteNav={!!props.hideSiteNav}
            />
            <div>{props.children}</div>
            {props.hideFooter ? '' : <AppFooter />}
        </div>
    );
}

export default withStyles(styles)(SiteSkeleton);
