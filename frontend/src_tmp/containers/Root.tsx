import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import React from 'react';
import Helmet from 'react-helmet';
import { StoreContext } from 'redux-react-hook';
import * as Store from '../store';
import * as Styles from '../styles';
import App from './App';

const store = Store.configureStore();

function Root() {
    return (
        <StoreContext.Provider value={store}>
            <Helmet titleTemplate='%s — weos.fund'>
                <link
                    href='https://fonts.googleapis.com/css?family=Permanent+Marker'
                    rel='stylesheet'
                />
            </Helmet>
            <ThemeProvider theme={Styles.theme}>
                <CssBaseline />
                <App />
            </ThemeProvider>
        </StoreContext.Provider>
    );
}

export default Root;
