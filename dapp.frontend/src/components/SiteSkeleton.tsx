import { withStyles, WithStyles } from '@material-ui/core/styles';
import React, { Component } from 'react';
import SiteFooter from './SiteFooter';
import SiteHeader from './SiteHeader';

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
            <SiteHeader
                hideUserNav={!!props.hideUserNav}
                hideSiteNav={!!props.hideSiteNav}
            />
            <div>{props.children}</div>
            {props.hideFooter ? '' : <SiteFooter />}
        </div>
    );
}

export default withStyles(styles)(SiteSkeleton);
