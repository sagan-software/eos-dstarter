import { Route, RouteType } from './types';

export function getRouteTemplate(type: RouteType): string {
    switch (type) {
    case RouteType.Home:
        return '/';
    case RouteType.About:
        return '/about';
    case RouteType.Explore:
        return '/explore';
    case RouteType.Start:
        return '/start';
    case RouteType.Login:
        return '/login';
    case RouteType.Settings:
        return '/settings';
    case RouteType.Project:
        return '/projects/:chainIdPrefix/:accountName/:projectName';
    case RouteType.Draft:
        return '/projects/:chainIdPrefix/:accountName/:draftName/edit';
    }
}

export function getRouteString(route: Route): string {
    switch (route.type) {
    case RouteType.Home:
        return '/';
    case RouteType.About:
        return '/about';
    case RouteType.Explore:
        return '/explore';
    case RouteType.Start:
        return '/start';
    case RouteType.Login:
        return '/login';
    case RouteType.Settings:
        return '/settings';
    case RouteType.Project:
        return `/projects/${normalizeChainIdPrefix(route.chainIdPrefix)}/${
                route.accountName
            }/${route.projectName}`;
    case RouteType.Draft:
        return `/projects/${normalizeChainIdPrefix(route.chainIdPrefix)}/${
                route.accountName
            }/${route.draftName}/edit`;
    }
}

export function normalizeChainIdPrefix(chainIdPrefix: string): string {
    return chainIdPrefix.slice(0, 12);
}
