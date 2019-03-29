import CircularProgress from '@material-ui/core/CircularProgress';
import CssBaseline from '@material-ui/core/CssBaseline';
import React from 'react';
import Helmet from 'react-helmet';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ScatterProvider } from './context/scatter';

const HomePage = React.lazy(() => import('./pages/HomePage'));
const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const StartPage = React.lazy(() => import('./pages/StartPage'));
const ExplorePage = React.lazy(() => import('./pages/ExplorePage'));
const AboutPage = React.lazy(() => import('./pages/AboutPage'));

function App() {
    return (
        <React.Suspense fallback={<CircularProgress />}>
            <ScatterProvider>
                <Router>
                    <Helmet titleTemplate='%s — DStarter' />
                    <CssBaseline />
                    <Route exact path='/' component={HomePage} />
                    <Route path='/about' component={AboutPage} />
                    <Route path='/explore' component={ExplorePage} />
                    <Route path='/start' component={StartPage} />
                    <Route path='/login' component={LoginPage} />
                </Router>
            </ScatterProvider>
        </React.Suspense>
    );
}

export default App;
