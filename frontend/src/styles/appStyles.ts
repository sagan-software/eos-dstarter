import { StyleRules, Theme } from '@material-ui/core/styles';

export default (theme: Theme): StyleRules<string> => ({
    appContainer: {},
    appFooter: {},
    appHeader: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing.unit * 2,
        paddingLeft: theme.spacing.unit * 3,
        paddingRight: theme.spacing.unit * 3,
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
            marginRight: theme.spacing.unit * 2,
        },
    },
    appUserNav: {
        flex: 1,
        padding: theme.spacing.unit,
        paddingRight: theme.spacing.unit * 2,
        display: 'flex',
        justifyContent: 'flex-end',
        '& > *': {
            marginLeft: theme.spacing.unit * 2,
        },
    },
    appMain: {},
});
