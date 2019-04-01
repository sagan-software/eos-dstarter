import { Theme } from '@material-ui/core/styles';

export default (theme: Theme) => ({
    container: {
        maxWidth: '960px',
        margin: '0 auto',
    },
    stepper: {
        background: 'transparent',
    },
    footer: {
        margin: '0 auto',
        maxWidth: '460px',
        opacity: 0.5,
    },
    stepContainer: {
        maxWidth: '460px',
        margin: theme.spacing.unit * 6,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    stepTitle: {},
    stepSubtitle: {},
    stepInner: {
        margin: theme.spacing.unit * 3,
        marginLeft: 0,
        marginRight: 0,
    },
    stepButtons: {
        margin: theme.spacing.unit * 3,
        marginLeft: 0,
        marginRight: 0,
        display: 'flex',
        justifyContent: 'space-between',
    },
});
