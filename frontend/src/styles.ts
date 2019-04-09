import teal from '@material-ui/core/colors/teal';
import { createMuiTheme, Theme } from '@material-ui/core/styles';
import {
    default as makeMuiStyles,
    StylesHook,
} from '@material-ui/styles/makeStyles';
import {
    Styles,
    ThemeOfStyles,
    WithStylesOptions,
} from '@material-ui/styles/withStyles';

export const theme = createMuiTheme({
    palette: {
        background: {
            default: '#ffffff',
        },
        primary: { main: teal[900] },
        secondary: { main: '#11cb5f' },
    },
});

export function makeStyles<S extends Styles<Theme, any>>(
    styles: S,
    options?: WithStylesOptions<ThemeOfStyles<S>>,
): StylesHook<S> {
    return makeMuiStyles(styles, options);
}
