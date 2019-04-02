import { WithStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import React from 'react';
import styles from '../styles/appStyles';

export interface Props
    extends WithStyles<typeof styles>,
        React.DetailedHTMLProps<
            React.HTMLAttributes<HTMLElement>,
            HTMLElement
        > {}

function AppMain({ classes, ...props }: Props) {
    return (
        <main
            {...props}
            className={classNames(classes.appMain, props.className)}
        >
            {props.children}
        </main>
    );
}

export default AppMain;
