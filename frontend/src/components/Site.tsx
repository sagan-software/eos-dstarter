import { Menu, MenuItem } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import MuiButton, {
    ButtonProps as MuiButtonProps,
} from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import MuiLink, { LinkProps as MuiLinkProps } from '@material-ui/core/Link';
import MuiTypography from '@material-ui/core/Typography';
import classNames from 'classnames';
import React, { useCallback } from 'react';
import * as Router from 'react-router-dom';
import * as Route from '../route';
import * as Store from '../store';
import { makeStyles } from '../styles';
import Identicon from './Identicon';

export type Props<E> = React.DetailedHTMLProps<React.HTMLAttributes<E>, E>;

const useContainerStyles = makeStyles({
    container: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
    },
});

export function Container(props: Props<HTMLDivElement>) {
    const classes = useContainerStyles();
    return (
        <div
            {...props}
            className={classNames(classes.container, props.className)}
        >
            {props.children}
        </div>
    );
}

const useHeaderStyles = makeStyles((theme) => ({
    header: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(2),
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
        borderBottomStyle: 'solid',
        borderBottomWidth: 1,
        borderBottomColor: theme.palette.grey[300],
        backgroundColor: theme.palette.common.white,
    },
}));

export function Header(props: Props<HTMLElement>) {
    const classes = useHeaderStyles();
    return (
        <header
            {...props}
            className={classNames(classes.header, props.className)}
        >
            {props.children}
        </header>
    );
}

const useMainStyles = makeStyles({
    main: {
        flex: 1,
    },
});

export function Main(props: Props<HTMLElement>) {
    const classes = useMainStyles();
    return (
        <main {...props} className={classNames(classes.main, props.className)}>
            {props.children}
        </main>
    );
}

export interface ButtonProps extends MuiButtonProps {
    readonly to: Route.Route;
}

export function Button({ to, ...props }: ButtonProps) {
    const toStr = Route.getRouteString(to);
    const Inner = React.forwardRef((innerProps: any, ref) => (
        <Router.Link {...innerProps} to={toStr} innerRef={ref} />
    ));
    return (
        <MuiButton {...props} component={Inner}>
            {props.children}
        </MuiButton>
    );
}

export interface LinkProps extends MuiLinkProps {
    readonly to: Route.Route;
}

export function Link(props: LinkProps) {
    const to = Route.getRouteString(props.to);
    const Inner = (innerProps: any) => <Router.Link {...innerProps} to={to} />;
    return (
        <MuiLink component={Inner} {...props}>
            {props.children}
        </MuiLink>
    );
}

const useLogoStyles = makeStyles((theme) => ({
    logo: {
        flex: 1,
        fontFamily: '\'Permanent Marker\', cursive',
        fontSize: theme.typography.h4.fontSize,
        textAlign: 'center',
        textTransform: 'lowercase',
        fontWeight: 700,
    },
}));

export function Logo(props: Props<HTMLElement>) {
    const classes = useLogoStyles();
    return (
        <Link
            className={classNames(classes.logo, props.className)}
            to={Route.home()}
            color='primary'
            underline='none'
        >
            WEOS.FUND
        </Link>
    );
}

const useSiteNavStyles = makeStyles((theme) => ({
    siteNav: {
        flex: 1,
        display: 'flex',
        '& > *': {
            marginRight: theme.spacing(4),
        },
    },
}));

export function SiteNav(props: Props<HTMLElement>) {
    const classes = useSiteNavStyles();
    return (
        <nav
            {...props}
            className={classNames(classes.siteNav, props.className)}
        >
            <Link to={Route.explore()} variant='body1'>
                Explore
            </Link>
            <Link to={Route.start()} variant='body1'>
                Start a project
            </Link>
        </nav>
    );
}

const useUserNavStyles = makeStyles((theme) => ({
    userNav: {
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-end',
        '& > *': {
            marginLeft: theme.spacing(4),
        },
    },
}));

export function UserNav() {
    const classes = useUserNavStyles();
    const identity = Store.useMappedState(
        useCallback(Store.Scatter.getIdentity, []),
    );
    return (
        <nav className={classes.userNav}>
            <Link to={Route.settings()} variant='body1'>
                Settings
            </Link>
            {identity &&
            identity.status === Store.Scatter.IdentityStatus.LoggedIn ? (
                <LoggedIn identity={identity} />
            ) : (
                <LoggedOut />
            )}
        </nav>
    );
}

function LoggedOut() {
    return (
        <Link to={Route.login()} variant='body1'>
            Login
        </Link>
    );
}

interface LoggedInProps {
    readonly identity: Store.Scatter.LoggedIn;
}

function LoggedIn({ identity }: LoggedInProps) {
    const dispatch = Store.useDispatch();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }
    const onClick = useCallback((e) => {
        e.preventDefault();
        dispatch<Store.Scatter.Logout>({
            type: Store.Scatter.Type.Logout,
        });
    }, []);
    const identiconHash = identity.accounts.map((acc) => acc.name).join('');
    return (
        <>
            <MuiButton onClick={handleClick}>
                <Avatar>
                    <Identicon hash={identiconHash} />
                    {/* <MuiLink href='#logout' variant='body1' onClick={onClick}>
                    Logout
                </MuiLink> */}
                </Avatar>
            </MuiButton>
            <Menu
                id='simple-menu'
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={onClick}>Logout</MenuItem>
            </Menu>
        </>
    );
}

const useFooterStyles = makeStyles((theme) => ({
    footer: {
        borderTopStyle: 'solid',
        borderTopWidth: 2,
        borderTopColor: theme.palette.grey[600],
    },
}));

export function Footer(props: Props<HTMLElement>) {
    const classes = useFooterStyles();
    return (
        <footer
            {...props}
            className={classNames(classes.footer, props.className)}
        >
            <TopCategories />
            <div>
                <section>
                    <MuiTypography variant='h6'>About</MuiTypography>
                    <ul>
                        <li>
                            <MuiLink href='/about' variant='body1'>
                                About us
                            </MuiLink>
                        </li>
                        <li>About us</li>
                    </ul>
                </section>
            </div>
        </footer>
    );
}

const useTopCategoriesStyles = makeStyles((theme) => ({
    topCategories: {
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        borderBottomStyle: 'solid',
        borderBottomWidth: 1,
        borderBottomColor: theme.palette.grey[300],
        '& > *': {
            margin: theme.spacing(2),
        },
    },
}));

export function TopCategories(props: Props<HTMLDivElement>) {
    const classes = useTopCategoriesStyles();
    return (
        <div
            {...props}
            className={classNames(classes.topCategories, props.className)}
        >
            <Link to={Route.explore()} variant='body1'>
                Arts
            </Link>
            <Link to={Route.explore()} variant='body1'>
                Comics &amp; Illustration
            </Link>
            <Link to={Route.explore()} variant='body1'>
                Design &amp; Tech
            </Link>
            <Link to={Route.explore()} variant='body1'>
                Film
            </Link>
            <Link to={Route.explore()} variant='body1'>
                Food &amp; Craft
            </Link>
            <Link to={Route.explore()} variant='body1'>
                Games
            </Link>
            <Link to={Route.explore()} variant='body1'>
                Music
            </Link>
            <Link to={Route.explore()} variant='body1'>
                Publishing
            </Link>
        </div>
    );
}

export function Skeleton(props: Props<HTMLElement>) {
    return (
        <Container>
            <Header>
                <SiteNav />
                <Logo />
                <UserNav />
            </Header>
            <Main>{props.children}</Main>
            <Footer />
        </Container>
    );
}

export function Loading(props: Props<HTMLElement>) {
    const classes = useLogoStyles();
    return (
        <Container>
            <Header>
                <MuiLink
                    href='#'
                    className={classes.logo}
                    color='primary'
                    underline='none'
                >
                    WEOS.FUND
                </MuiLink>
            </Header>
            <Main>
                <CircularProgress size={100} />
            </Main>
        </Container>
    );
}
