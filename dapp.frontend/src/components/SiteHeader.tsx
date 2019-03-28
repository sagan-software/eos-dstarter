import Button, { ButtonProps } from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import {
    BrowserRouter as Router,
    Link,
    LinkProps,
    Route,
} from 'react-router-dom';

function UserNav() {
    const MyLink = (props: any) => <Link to='/login' {...props} />;
    return (
        <Button color='inherit' component={MyLink}>
            Login
        </Button>
    );
}

const styles = {};

export interface Props extends WithStyles<typeof styles> {
    readonly hideUserNav?: boolean;
    readonly hideSiteNav?: boolean;
}

function SiteHeader(props: Props) {
    return (
        <Grid container spacing={24} justify='center' alignItems='center'>
            <Grid item xs={4} hidden={props.hideSiteNav}>
                <Link to='/explore'>Explore</Link>
                <Link to='/start'>Start a project</Link>
            </Grid>
            <Grid item xs>
                <Typography variant='h6' color='inherit' align='center'>
                    EOSFUNDER
                </Typography>
            </Grid>
            <Grid item xs={4} hidden={props.hideSiteNav}>
                <Link to='/start'>Search</Link>
                <UserNav />
            </Grid>
        </Grid>
    );
}

SiteHeader.propTypes = {
    classes: PropTypes.object.isRequired,
} as any;

export default withStyles(styles)(SiteHeader);
