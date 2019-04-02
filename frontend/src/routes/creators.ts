import {
    AboutRoute,
    DraftRoute,
    ExploreRoute,
    HomeRoute,
    LoginRoute,
    ProjectRoute,
    RouteType,
    SettingsRoute,
    StartRoute,
} from './types';

export function homeRoute(): HomeRoute {
    return { type: RouteType.Home };
}

export function startRoute(): StartRoute {
    return { type: RouteType.Start };
}

export function exploreRoute(): ExploreRoute {
    return { type: RouteType.Explore };
}

export function aboutRoute(): AboutRoute {
    return { type: RouteType.About };
}

export function loginRoute(): LoginRoute {
    return { type: RouteType.Login };
}

export function settingsRoute(): SettingsRoute {
    return { type: RouteType.Settings };
}

export function projectRoute(
    chainIdPrefix: string,
    accountName: string,
    projectName: string,
): ProjectRoute {
    return { type: RouteType.Project, chainIdPrefix, accountName, projectName };
}

export function draftRoute(
    chainIdPrefix: string,
    accountName: string,
    draftName: string,
): DraftRoute {
    return { type: RouteType.Draft, chainIdPrefix, accountName, draftName };
}
