import teal from '@material-ui/core/colors/teal';
import * as MuiStyles from '@material-ui/core/styles';

export type Styles = MuiStyles.StyleRules<string>;
export type Props = MuiStyles.WithStyles<Styles>;
export type Theme = MuiStyles.Theme;
export type MapThemeToStyles = (theme: Theme) => Styles;

export const theme: Theme = MuiStyles.createMuiTheme({
    palette: {
        background: {
            default: '#ffffff',
        },
        primary: { main: teal[900] },
        secondary: { main: '#11cb5f' },
    },
    typography: { useNextVariants: true },
});

export const withStyles = (mapThemeToStyles: MapThemeToStyles) =>
    MuiStyles.withStyles(mapThemeToStyles, { withTheme: true });
