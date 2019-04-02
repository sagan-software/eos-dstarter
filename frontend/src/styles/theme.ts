import teal from '@material-ui/core/colors/teal';
import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
    palette: {
        background: {
            default: '#ffffff',
        },
        primary: { main: teal[900] },
        secondary: { main: '#11cb5f' },
    },
    typography: { useNextVariants: true },
});
