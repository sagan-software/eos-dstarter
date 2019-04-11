export type Route =
    | Home
    | Start
    | Explore
    | Login
    | About
    | Project
    | Draft
    | Settings
    | MyProjects;

export enum Type {
    Home,
    Start,
    Explore,
    Login,
    About,
    Project,
    Draft,
    Settings,
    MyProjects,
}

export interface Home {
    readonly type: Type.Home;
}

export function home(): Home {
    return { type: Type.Home };
}

export interface Start {
    readonly type: Type.Start;
}

export function start(): Start {
    return { type: Type.Start };
}
export interface Explore {
    readonly type: Type.Explore;
}

export function explore(): Explore {
    return { type: Type.Explore };
}

export interface About {
    readonly type: Type.About;
}

export function about(): About {
    return { type: Type.About };
}

export interface Login {
    readonly type: Type.Login;
}

export function login(): Login {
    return { type: Type.Login };
}
export interface Settings {
    readonly type: Type.Settings;
}

export function settings(): Settings {
    return { type: Type.Settings };
}

export interface Project {
    readonly type: Type.Project;
    readonly chainIdPrefix: string;
    readonly accountName: string;
    readonly projectName: string;
}

export function project(
    chainIdPrefix: string,
    accountName: string,
    projectName: string,
): Project {
    return { type: Type.Project, chainIdPrefix, accountName, projectName };
}

export interface Draft {
    readonly type: Type.Draft;
    readonly chainIdPrefix: string;
    readonly accountName: string;
    readonly draftName: string;
}

export function draft(
    chainIdPrefix: string,
    accountName: string,
    draftName: string,
): Draft {
    return { type: Type.Draft, chainIdPrefix, accountName, draftName };
}

export interface MyProjects {
    readonly type: Type.MyProjects;
}

export function myProjects(): MyProjects {
    return { type: Type.MyProjects };
}

export function getRouteTemplate(type: Type): string {
    switch (type) {
    case Type.Home:
        return '/';
    case Type.About:
        return '/about';
    case Type.Explore:
        return '/explore';
    case Type.Start:
        return '/start';
    case Type.Login:
        return '/login';
    case Type.Settings:
        return '/settings';
    case Type.Project:
        return '/projects/:chainIdPrefix/:accountName/:projectName';
    case Type.Draft:
        return '/projects/:chainIdPrefix/:accountName/:draftName/edit';
    case Type.MyProjects:
        return '/me';
    }
}

export function getRouteString(route: Route): string {
    switch (route.type) {
    case Type.Home:
        return '/';
    case Type.About:
        return '/about';
    case Type.Explore:
        return '/explore';
    case Type.Start:
        return '/start';
    case Type.Login:
        return '/login';
    case Type.Settings:
        return '/settings';
    case Type.Project:
        return `/projects/${normalizeChainIdPrefix(route.chainIdPrefix)}/${
                route.accountName
            }/${route.projectName}`;
    case Type.Draft:
        return `/projects/${normalizeChainIdPrefix(route.chainIdPrefix)}/${
                route.accountName
            }/${route.draftName}/edit`;
    case Type.MyProjects:
        return '/me';
    }
}

export function normalizeChainIdPrefix(chainIdPrefix: string): string {
    return chainIdPrefix.slice(0, 12);
}
