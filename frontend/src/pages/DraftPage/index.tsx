import { withStyles, WithStyles } from '@material-ui/core/styles';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { match } from 'react-router-dom';
import { AppState } from '../../store';
import * as draftPageStore from '../../store/draftPage';
import * as rpcServersStore from '../../store/rpcServers';
import styles from '../../styles/draftPage';

export interface Params {
    readonly chainIdPrefix: string;
    readonly accountName: string;
    readonly draftName: string;
}

export interface Props extends WithStyles<typeof styles> {
    readonly state: draftPageStore.DraftPageState;
    readonly match: match<Params>;
    readonly loadDraft: any;
    readonly checkAllRpcServers: any;
}

function DraftPage(props: Props) {
    console.warn(props.match);
    useEffect(() => {
        props.checkAllRpcServers().then(() => {
            return props.loadDraft(
                props.match.params.chainIdPrefix,
                props.match.params.accountName,
                props.match.params.draftName,
            );
        });
    }, [1]);
    return (
        <div>
            <h2>Draft</h2>
        </div>
    );
}

const mapStateToProps = (state: AppState) => ({
    state: state.draftPage,
});

export default withStyles(styles, { withTheme: true })(
    connect(
        mapStateToProps,
        {
            checkAllRpcServers: rpcServersStore.checkAllRpcServers,
            loadDraft: draftPageStore.load,
        },
    )(DraftPage),
);
