import { withStyles, WithStyles } from '@material-ui/core/styles';
import React from 'react';
import { connect } from 'react-redux';
import AppSkeleton from '../../components/AppSkeleton';
import Identicon from '../../components/Identicon';
import TopCategories from '../../components/TopCategories';
import { RootState } from '../../store/root';
import * as scatterStore from '../../store/scatter';
import styles from '../../styles/appStyles';

export interface Props extends WithStyles<typeof styles> {
    readonly scatter: scatterStore.ScatterState;
    readonly logout: any;
}

function HomePage({ classes, ...props }: Props) {
    return (
        <AppSkeleton
            classes={classes}
            scatter={props.scatter}
            logout={props.logout}
        >
            <TopCategories classes={classes} />
            <h2>Home</h2>
        </AppSkeleton>
    );
}

const mapStateToProps = (state: RootState) => ({
    scatter: state.scatter,
});

export default withStyles(styles, { withTheme: true })(
    connect(
        mapStateToProps,
        { logout: scatterStore.logout },
    )(HomePage),
);
