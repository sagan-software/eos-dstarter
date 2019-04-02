import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AppLoading from '../components/AppLoading';
import { getRouteTemplate, RouteType } from '../routes';
import * as appStore from '../store/app';
import { RootState } from '../store/root';

const HomePage = React.lazy(() => import('./HomePage'));
const LoginPage = React.lazy(() => import('./LoginPage'));
const StartPage = React.lazy(() => import('./StartPage'));
const ExplorePage = React.lazy(() => import('./ExplorePage'));
const AboutPage = React.lazy(() => import('./AboutPage'));
const SettingsPage = React.lazy(() => import('./SettingsPage'));
const DraftPage = React.lazy(() => import('./DraftPage'));

export interface Props {
    readonly init: any;
}

function App(props: Props) {
    useEffect(() => {
        props.init();
    }, [true]);
    return (
        <React.Suspense fallback={<AppLoading />}>
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
    );
}

export default connect(
    (state: RootState) => ({}),
    { init: appStore.init },
)(App);
