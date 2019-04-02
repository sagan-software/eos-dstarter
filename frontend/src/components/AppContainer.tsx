import { WithStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import React from 'react';
import styles from '../styles/appStyles';

export interface Props
    extends WithStyles<typeof styles>,
        React.DetailedHTMLProps<
            React.HTMLAttributes<HTMLDivElement>,
            HTMLDivElement
        > {}

function AppContainer({ classes, ...props }: Props) {
    return (
        <div
            {...props}
            className={classNames(classes.appContainer, props.className)}
        >
            {props.children}
        </div>
    );
}

export default AppContainer;
