import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import Helmet from 'react-helmet';
import { Provider } from 'react-redux';
import configureStore from '../store';
import theme from '../styles/theme';
import App from './App';

const store = configureStore();

function Root() {
    return (
        <Provider store={store}>
            <Helmet titleTemplate='%s — weos.fund'>
                <link
                    href='https://fonts.googleapis.com/css?family=Permanent+Marker'
                    rel='stylesheet'
                />
            </Helmet>
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                <App />
            </MuiThemeProvider>
        </Provider>
    );
}

export default Root;
