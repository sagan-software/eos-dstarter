import { Link, Typography } from '@material-ui/core';
import { WithStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import React from 'react';
import styles from '../styles/appStyles';
import TopCategories from './TopCategories';

export interface Props
    extends WithStyles<typeof styles>,
        React.DetailedHTMLProps<
            React.HTMLAttributes<HTMLElement>,
            HTMLElement
        > {}

function AppFooter({ classes, ...props }: Props) {
    return (
        <footer
            {...props}
            className={classNames(classes.appFooter, props.className)}
        >
            <TopCategories classes={classes} />
            <div className={classes.footerSections}>
                <section className={classes.footerSection}>
                    <Typography variant='h6'>About</Typography>
                    <ul>
                        <li>
                            <Link href='/about' variant='body1'>
                                About us
                            </Link>
                        </li>
                        <li>About us</li>
                    </ul>
                </section>
            </div>
        </footer>
    );
}

export default AppFooter;
