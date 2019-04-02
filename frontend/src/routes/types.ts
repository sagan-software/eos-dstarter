export type Route =
    | HomeRoute
    | StartRoute
    | ExploreRoute
    | LoginRoute
    | AboutRoute
    | ProjectRoute
    | DraftRoute
    | SettingsRoute;

export enum RouteType {
    Home,
    Start,
    Explore,
    Login,
    About,
    Project,
    Draft,
    Settings,
}

export interface HomeRoute {
    readonly type: RouteType.Home;
}

export interface StartRoute {
    readonly type: RouteType.Start;
}

export interface ExploreRoute {
    readonly type: RouteType.Explore;
}

export interface AboutRoute {
    readonly type: RouteType.About;
}

export interface LoginRoute {
    readonly type: RouteType.Login;
}

export interface SettingsRoute {
    readonly type: RouteType.Settings;
}

export interface ProjectRoute {
    readonly type: RouteType.Project;
    readonly chainIdPrefix: string;
    readonly accountName: string;
    readonly projectName: string;
}

export interface DraftRoute {
    readonly type: RouteType.Draft;
    readonly chainIdPrefix: string;
    readonly accountName: string;
    readonly draftName: string;
}
