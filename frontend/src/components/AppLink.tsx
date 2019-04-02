import Link, { LinkProps } from '@material-ui/core/Link';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { getRouteString, Route } from '../routes';

export interface Props extends LinkProps {
    readonly to: Route;
}

function AppLink(props: Props) {
    const to = getRouteString(props.to);
    const Inner = (innerProps: any) => <RouterLink {...innerProps} to={to} />;
    return (
        <Link component={Inner} {...props}>
            {props.children}
        </Link>
    );
}

export default AppLink;
