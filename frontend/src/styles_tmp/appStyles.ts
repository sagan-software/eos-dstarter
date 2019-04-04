import { StyleRules, Theme } from '@material-ui/core/styles';

export default (theme: Theme): StyleRules<string> => ({
    appContainer: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
    },
    appHeader: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing.unit * 2,
        paddingLeft: theme.spacing.unit * 4,
        paddingRight: theme.spacing.unit * 4,
        borderBottomStyle: 'solid',
        borderBottomWidth: 1,
        borderBottomColor: theme.palette.grey[300],
        backgroundColor: theme.palette.common.white,
    },
    appLogo: {
        flex: 1,
        fontFamily: '\'Permanent Marker\', cursive',
        fontSize: theme.typography.h4.fontSize,
        textAlign: 'center',
        textTransform: 'lowercase',
        fontWeight: 700,
    },
    appSiteNav: {
        flex: 1,
        display: 'flex',
        '& > *': {
            marginRight: theme.spacing.unit * 4,
        },
    },
    appUserNav: {
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-end',
        '& > *': {
            marginLeft: theme.spacing.unit * 4,
        },
    },
    topCategories: {
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        borderBottomStyle: 'solid',
        borderBottomWidth: 1,
        borderBottomColor: theme.palette.grey[300],
        '& > *': {
            margin: theme.spacing.unit * 2,
        },
    },
    appMain: {
        flex: 1,
    },
    appFooter: {
        borderTopStyle: 'solid',
        borderTopWidth: 2,
        borderTopColor: theme.palette.grey[600],
    },
});
