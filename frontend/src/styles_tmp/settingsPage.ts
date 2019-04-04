import { StyleRules, Theme } from '@material-ui/core/styles';
import getAppStyles from './appStyles';
import getPageStyles from './page';

export default function(theme: Theme): StyleRules<string> {
    const appStyles = getAppStyles(theme);
    const pageStyles = getPageStyles(theme);
    return {
        ...appStyles,
        ...pageStyles,
        heading: {
            fontSize: theme.typography.pxToRem(15),
            flexBasis: '33.33%',
            flexShrink: 0,
        },
        secondaryHeading: {
            fontSize: theme.typography.pxToRem(15),
            color: theme.palette.text.secondary,
        },
        container: {
            maxWidth: '960px',
            margin: '0 auto',
        },
    };
}
