import React, { useEffect } from 'react';
import * as Router from 'react-router-dom';
import * as Route from '../route';
import * as Store from '../store';
import * as Site from './Site';

const HomePage = React.lazy(() => import('./HomePage'));
const LoginPage = React.lazy(() => import('./LoginPage'));
const StartPage = React.lazy(() => import('./StartPage'));
const NotFoundPage = React.lazy(() => import('./NotFoundPage'));
// const ExplorePage = React.lazy(() => import('./ExplorePage'));
// const AboutPage = React.lazy(() => import('./AboutPage'));
const SettingsPage = React.lazy(() => import('./SettingsPage'));
const DraftPage = React.lazy(() => import('./DraftPage'));
const MyProjectsPage = React.lazy(() => import('./MyProjectsPage'));

function App() {
    const dispatch = Store.useDispatch();
    useEffect(() => {
        dispatch<Store.App.Init>({ type: Store.App.Type.Init });
    }, []);
    return (
        <React.Suspense fallback={<Site.Loading />}>
            <Router.BrowserRouter>
                <Router.Switch>
                    <Router.Route
                        exact
                        path={Route.getRouteTemplate(Route.Type.Home)}
                        component={HomePage}
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
                    />
                    <Router.Route
                        path={Route.getRouteTemplate(Route.Type.MyProjects)}
                        component={MyProjectsPage}
                    />
                    {/* <Router.Route
                    path={Route.getRouteTemplate(Route.Type.About)}
                    component={AboutPage}
                />
                <Router.Route
                    path={Route.getRouteTemplate(Route.Type.Explore)}
                    component={ExplorePage}
                /> */}
                    <Router.Route component={NotFoundPage} />
                </Router.Switch>
            </Router.BrowserRouter>
        </React.Suspense>
    );
}

export default App;
