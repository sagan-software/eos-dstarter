import CircularProgress from '@material-ui/core/CircularProgress';
import CssBaseline from '@material-ui/core/CssBaseline';
import React from 'react';
import Helmet from 'react-helmet';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const HomePage = React.lazy(() => import('./HomePage'));
const LoginPage = React.lazy(() => import('./LoginPage'));
const StartPage = React.lazy(() => import('./StartPage'));
const ExplorePage = React.lazy(() => import('./ExplorePage'));
const AboutPage = React.lazy(() => import('./AboutPage'));

function App() {
    return (
        <React.Suspense fallback={<CircularProgress />}>
            <Router>
                <Helmet titleTemplate='%s — DStarter' />
                <CssBaseline />
                <Route exact path='/' component={HomePage} />
                <Route path='/about' component={AboutPage} />
                <Route path='/explore' component={ExplorePage} />
                <Route path='/start' component={StartPage} />
                <Route path='/login' component={LoginPage} />
            </Router>
        </React.Suspense>
    );
}

export default App;
