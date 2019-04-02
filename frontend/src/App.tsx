import CircularProgress from '@material-ui/core/CircularProgress';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import Helmet from 'react-helmet';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { getRouteTemplate, RouteType } from './routes';
import configureStore from './store';
import theme from './styles/theme';

const store = configureStore();

const HomePage = React.lazy(() => import('./pages/HomePage'));
const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const StartPage = React.lazy(() => import('./pages/StartPage'));
const ExplorePage = React.lazy(() => import('./pages/ExplorePage'));
const AboutPage = React.lazy(() => import('./pages/AboutPage'));
const SettingsPage = React.lazy(() => import('./pages/SettingsPage'));
const DraftPage = React.lazy(() => import('./pages/DraftPage'));

function App() {
    return (
        <Provider store={store}>
            <Helmet titleTemplate='%s — DStarter'>
                <link
                    href='https://fonts.googleapis.com/css?family=Permanent+Marker'
                    rel='stylesheet'
                />
            </Helmet>
            <CssBaseline />
            <MuiThemeProvider theme={theme}>
                <React.Suspense fallback={<CircularProgress />}>
                    <Router>
                        <Route
                            exact
                            path={getRouteTemplate(RouteType.Home)}
                            component={HomePage}
                        />
                        <Route
                            path={getRouteTemplate(RouteType.About)}
                            component={AboutPage}
                        />
                        <Route
                            path={getRouteTemplate(RouteType.Explore)}
                            component={ExplorePage}
                        />
                        <Route
                            path={getRouteTemplate(RouteType.Start)}
                            component={StartPage}
                        />
                        <Route
                            path={getRouteTemplate(RouteType.Login)}
                            component={LoginPage}
                        />
                        <Route
                            path={getRouteTemplate(RouteType.Settings)}
                            component={SettingsPage}
                        />
                        <Route
                            path={getRouteTemplate(RouteType.Draft)}
                            component={DraftPage}
                        />
                    </Router>
                </React.Suspense>
            </MuiThemeProvider>
        </Provider>
    );
}

export default App;
