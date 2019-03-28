import CssBaseline from '@material-ui/core/CssBaseline';
import React from 'react';
import Helmet from 'react-helmet';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AboutPage from './pages/AboutPage';
import ExplorePage from './pages/ExplorePage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import StartPage from './pages/StartPage';

function App() {
    return (
        <Router>
            <Helmet titleTemplate='%s — DStarter' />
            <CssBaseline />
            <Route exact path='/' component={HomePage} />
            <Route path='/about' component={AboutPage} />
            <Route path='/explore' component={ExplorePage} />
            <Route path='/start' component={StartPage} />
            <Route path='/login' component={LoginPage} />
        </Router>
    );
}

export default App;
