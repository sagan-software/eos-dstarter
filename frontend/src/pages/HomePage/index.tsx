import { withStyles, WithStyles } from '@material-ui/core/styles';
import React from 'react';
import AppSkeleton from '../../components/AppSkeleton';
import styles from '../../styles/appStyles';

export interface Props extends WithStyles<typeof styles> {}

function HomePage({ classes }: Props) {
    return (
        <AppSkeleton classes={classes}>
            <h2>Home</h2>
        </AppSkeleton>
    );
}

export default withStyles(styles, { withTheme: true })(HomePage);
