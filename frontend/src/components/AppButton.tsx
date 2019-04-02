import Button, { ButtonProps } from '@material-ui/core/Button';
import React from 'react';
import { Link } from 'react-router-dom';
import { getRouteString, Route } from '../routes';

export interface Props extends ButtonProps {
    readonly to: Route;
}

function AppButton(props: Props) {
    const to = getRouteString(props.to);
    const Inner = (innerProps: any) => <Link {...innerProps} to={to} />;
    return (
        <Button component={Inner} {...props}>
            {props.children}
        </Button>
    );
}

export default AppButton;
