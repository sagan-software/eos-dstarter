import { StyleRules, Theme } from '@material-ui/core/styles';
import getAppStyles from './appStyles';

export default function(theme: Theme): StyleRules<string> {
    const appStyles = getAppStyles(theme);
    return {
        ...appStyles,
        pageHeader: {
            minHeight: '150px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },
        pageTitle: {},
        pageSubtitle: {},
    };
}
