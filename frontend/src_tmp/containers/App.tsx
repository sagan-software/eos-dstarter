import React, { useEffect } from 'react';
import * as Router from 'react-router-dom';
import * as Site from '../components/Site';
import * as Route from '../route';
import * as Store from '../store';

const HomePage = React.lazy(() => import('./HomePage'));
// const LoginPage = React.lazy(() => import('./LoginPage'));
// const StartPage = React.lazy(() => import('./StartPage'));
// const ExplorePage = React.lazy(() => import('./ExplorePage'));
// const AboutPage = React.lazy(() => import('./AboutPage'));
// const SettingsPage = React.lazy(() => import('./SettingsPage'));
// const DraftPage = React.lazy(() => import('./DraftPage'));

export interface Props {
    readonly init: any;
}

function App(props: Props) {
    useEffect(() => {
        props.init();
    }, [true]);
    return (
        <React.Suspense fallback={<Site.Loading />}>
            <Router.BrowserRouter>
                <Router.Route
                    exact
                    path={Route.getRouteTemplate(Route.Type.Home)}
                    component={HomePage}
                />
                {/* <Router.Route
                    path={Route.getRouteTemplate(Route.Type.About)}
                    component={AboutPage}
                />
                <Router.Route
                    path={Route.getRouteTemplate(Route.Type.Explore)}
                    component={ExplorePage}
                />
                <Router.Route
                    path={Route.getRouteTemplate(Route.Type.Start)}
                    component={StartPage}
                />
                <Router.Route
                    path={Route.getRouteTemplate(Route.Type.Login)}
                    component={LoginPage}
                />
                <Router.Route
                    path={Route.getRouteTemplate(Route.Type.Settings)}
                    component={SettingsPage}
                />
                <Router.Route
                    path={Route.getRouteTemplate(Route.Type.Draft)}
                    component={DraftPage}
                /> */}
            </Router.BrowserRouter>
        </React.Suspense>
    );
}

export default Store.connect((state) => ({}), { init: Store.App.init })(App);
