import { WithStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import styles from '../styles/page';

export interface Props extends WithStyles<typeof styles> {
    readonly children?: any;
    readonly gutterBottom?: boolean;
}

function PageTitle(props: Props) {
    return (
        <Typography
            variant='h4'
            align='center'
            className={props.classes.pageTitle}
            gutterBottom={props.gutterBottom}
        >
            {props.children}
        </Typography>
    );
}

export default PageTitle;
