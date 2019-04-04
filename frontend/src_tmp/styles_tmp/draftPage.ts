import { StyleRules, Theme } from '@material-ui/core/styles';
import getAppStyles from './appStyles';

export default function(theme: Theme): StyleRules<string> {
    const appStyles = getAppStyles(theme);
    return {
        ...appStyles,
        appLogo: {
            ...appStyles.appLogo,
            flex: 'unset',
        },
        navLinks: {
            flex: 1,
            paddingLeft: theme.spacing.unit * 3,
            display: 'flex',
            alignItems: 'center',
        },
        navLink: {
            margin: theme.spacing.unit,
        },
        navSep: {
            opacity: 0.1,
        },
        stepTitle: {},
        stepSubtitle: {
            opacity: 0.6,
        },
        exitToOverview: {},
        pageHeader: {
            minHeight: '200px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomStyle: appStyles.appHeader.borderBottomStyle,
            borderBottomWidth: appStyles.appHeader.borderBottomWidth,
            borderBottomColor: appStyles.appHeader.borderBottomColor,
        },
        pageFooter: {
            position: 'fixed',
            bottom: 0,
            left: 0,
            width: '100vw',
            display: 'flex',
            justifyContent: 'flex-end',
            padding: theme.spacing.unit * 3,
            backgroundColor: theme.palette.grey[50],
            borderTopStyle: appStyles.appHeader.borderBottomStyle,
            borderTopWidth: appStyles.appHeader.borderBottomWidth,
            borderTopColor: appStyles.appHeader.borderBottomColor,
        },
        prevButton: {
            backgroundColor: theme.palette.common.white,
            paddingLeft: theme.spacing.unit * 7,
            paddingRight: theme.spacing.unit * 7,
        },
        nextButton: {
            marginLeft: theme.spacing.unit * 2,
            paddingLeft: theme.spacing.unit * 7,
            paddingRight: theme.spacing.unit * 7,
        },
    };
}
