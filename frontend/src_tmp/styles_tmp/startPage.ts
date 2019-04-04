import { StyleRules, Theme } from '@material-ui/core/styles';
import getAppStyles from './appStyles';

export default function(theme: Theme): StyleRules<string> {
    const appStyles = getAppStyles(theme);
    return {
        ...appStyles,
        appHeader: {
            ...appStyles.appHeader,
            borderBottomWidth: 0,
        },
        appMain: {
            ...appStyles.appMain,
            maxWidth: '960px',
            margin: '0 auto',
            width: '100%',
        },
        stepper: {
            background: 'transparent',
        },
        stepContainer: {
            maxWidth: '500px',
            marginTop: theme.spacing.unit * 6,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        stepTitle: {},
        stepSubtitle: {
            opacity: 0.6,
        },
        stepInner: {
            margin: theme.spacing.unit * 5,
            marginLeft: 0,
            marginRight: 0,
        },
        stepButtons: {
            margin: theme.spacing.unit * 5,
            marginLeft: 0,
            marginRight: 0,
            display: 'flex',
            justifyContent: 'space-between',
        },
        categorySelectMenu: {
            padding: theme.spacing.unit * 2,
            fontSize: theme.typography.h6.fontSize,
        },
        categorySelectIcon: {
            right: theme.spacing.unit * 2,
        },
    };
}
