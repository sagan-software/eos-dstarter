import { WithStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import React from 'react';
import { exploreRoute } from '../routes';
import styles from '../styles/appStyles';
import AppLink from './AppLink';

export interface Props
    extends WithStyles<typeof styles>,
        React.DetailedHTMLProps<
            React.HTMLAttributes<HTMLElement>,
            HTMLDivElement
        > {}

function TopCategories({ classes, ...props }: Props) {
    return (
        <div
            {...props}
            className={classNames(classes.topCategories, props.className)}
        >
            <AppLink to={exploreRoute()} variant='body1'>
                Arts
            </AppLink>
            <AppLink to={exploreRoute()} variant='body1'>
                Comics &amp; Illustration
            </AppLink>
            <AppLink to={exploreRoute()} variant='body1'>
                Design &amp; Tech
            </AppLink>
            <AppLink to={exploreRoute()} variant='body1'>
                Film
            </AppLink>
            <AppLink to={exploreRoute()} variant='body1'>
                Food &amp; Craft
            </AppLink>
            <AppLink to={exploreRoute()} variant='body1'>
                Games
            </AppLink>
            <AppLink to={exploreRoute()} variant='body1'>
                Music
            </AppLink>
            <AppLink to={exploreRoute()} variant='body1'>
                Publishing
            </AppLink>
        </div>
    );
}

export default TopCategories;
