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

function AppHeader({ classes, ...props }: Props) {
    return (
        <header
            {...props}
            className={classNames(classes.appHeader, props.className)}
        >
            {props.children}
        </header>
    );
}

export default AppHeader;
