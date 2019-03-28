import { withStyles, WithStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

const styles = {};

function SiteFooter() {
    return <div>Footer</div>;
}

SiteFooter.propTypes = {
    classes: PropTypes.object.isRequired,
} as any;

export default withStyles(styles)(SiteFooter);
