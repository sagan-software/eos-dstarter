import CircularProgress from '@material-ui/core/CircularProgress';
import CssBaseline from '@material-ui/core/CssBaseline';
import React from 'react';
import Helmet from 'react-helmet';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import configureStore from './store';

const store = configureStore();

const HomePage = React.lazy(() => import('./pages/HomePage'));
const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const StartPage = React.lazy(() => import('./pages/StartPage'));
const ExplorePage = React.lazy(() => import('./pages/ExplorePage'));
const AboutPage = React.lazy(() => import('./pages/AboutPage'));
const DraftPage = React.lazy(() => import('./pages/DraftPage'));

function App() {
    return (
        <Provider store={store}>
            <React.Suspense fallback={<CircularProgress />}>
                <Router>
                    <Helmet titleTemplate='%s — DStarter' />
                    <CssBaseline />
                    <Route exact path='/' component={HomePage} />
                    <Route path='/about' component={AboutPage} />
                    <Route path='/explore' component={ExplorePage} />
                    <Route path='/start' component={StartPage} />
                    <Route path='/login' component={LoginPage} />
                    <Route
                        path='/projects/:chainIdPrefix/:accountName/:draftName/edit'
                        component={DraftPage}
                    />
                </Router>
            </React.Suspense>
        </Provider>
    );
}

export default App;
