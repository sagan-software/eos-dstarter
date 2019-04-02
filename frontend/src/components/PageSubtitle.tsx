import { WithStyles } from '@material-ui/core/styles';
import Typography, { TypographyProps } from '@material-ui/core/Typography';
import React from 'react';
import styles from '../styles/page';

export interface Props extends WithStyles<typeof styles> {
    readonly children?: any;
    readonly gutterBottom?: boolean;
}

function PageSubtitle(props: Props) {
    return (
        <Typography
            variant='body1'
            align='center'
            className={props.classes.pageSubtitle}
            gutterBottom={props.gutterBottom}
        >
            {props.children}
        </Typography>
    );
}

export default PageSubtitle;
