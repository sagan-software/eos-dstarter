export interface State {
    [chainId: string]: {
        [accountName: string]: {
            [projectName: string]: Project;
        };
    };
}

export const initialState: State = {};

export type Project = ProjectOk | ProjectErr;

export enum Status {
    Loading,
    Ok,
    Err,
}

export interface ProjectOk {
    readonly status: Status.Ok;
    readonly projectName: string; // eosio name
    readonly creator: string; // eosio name
    readonly title: string;
    readonly subtitle: string;
    readonly goalAmount: string; // asset
    readonly goalType: ProjectGoalType;
    readonly stage: ProjectStage;
    readonly category: Category;
    readonly tags: ReadonlyArray<string>;
    readonly imageHash: string; // ipfs hash
    readonly videoHash: string; // ipfs hash
    readonly storyHash: string; // ipfs hash
    readonly rewards: ReadonlyArray<ProjectReward>;
    readonly startTime: Date;
    readonly endTime: Date;
    readonly durationDays: number;
    readonly pledgedTotal: number;
    readonly pledgedClaimed: number;
}

export enum ErrorCode {
    NoChainOk,
    NoRpcServerOk,
    NotFound,
    Unknown,
}

export interface ProjectErr {
    readonly status: Status.Err;
    readonly code: ErrorCode;
    readonly message: string;
}

export enum ProjectGoalType {
    AllOrNothing = 1,
    Flexible = 2,
}

export enum ProjectStage {
    Concept = 1,
    Prototype = 2,
    Production = 3,
    Shipping = 4,
}

export interface ProjectReward {
    readonly title: string;
    readonly description: string;
    readonly pledgeAmount: string; // asset
    readonly items: ReadonlyArray<ProjectRewardItem>;
    readonly estimatedDelivery: Date;
    readonly startQuantity: number;
    readonly currentQuantity: number;
    readonly startTime: Date;
    readonly endTime: Date;
}

export interface ProjectRewardItem {
    readonly name: string;
    readonly quantity: number;
}

export function randomName(): string {
    let text = '';
    const possible = 'abcdefghijklmnopqrstuvwxyz12345';
    for (let i = 0; i < 12; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

export enum Category {
    ART = 100,
    ART__CERAMICS = 101,
    ART__CONCEPTUAL_ART = 102,
    ART__DIGITAL_ART = 103,
    ART__ILLUSTRATION = 104,
    ART__INSTALLATIONS = 105,
    ART__MIXED_MEDIA = 106,
    ART__PAINTING = 107,
    ART__PERFORMANCE_ART = 108,
    ART__PUBLIC_ART = 109,
    ART__SCULPTURE = 110,
    ART__TEXTILES = 111,
    ART__VIDEO_ART = 112,
    COMICS = 200,
    COMICS__ANTHOLOGIES = 201,
    COMICS__COMIC_BOOKS = 202,
    COMICS__EVENTS = 203,
    COMICS__GRAPHIC_NOVELS = 204,
    COMICS__WEBCOMICS = 205,
    CRAFTS = 300,
    CRAFTS__CANDLES = 301,
    CRAFTS__CROCHET = 302,
    CRAFTS__DIY = 303,
    CRAFTS__EMBROIDERY = 304,
    CRAFTS__GLASS = 305,
    CRAFTS__KNITTING = 306,
    CRAFTS__POTTERY = 307,
    CRAFTS__PRINTING = 308,
    CRAFTS__QUILTS = 309,
    CRAFTS__STATIONERY = 310,
    CRAFTS__TAXIDERMY = 311,
    CRAFTS__WEAVING = 312,
    CRAFTS__WOODWORKING = 313,
    DANCE = 400,
    DANCE__PERFORMANCES = 401,
    DANCE__RESIDENCIES = 402,
    DANCE__SPACES = 403,
    DANCE__WORKSHOPS = 404,
    DESIGN = 500,
    DESIGN__ARCHITECTURE = 501,
    DESIGN__CIVIC_DESIGN = 502,
    DESIGN__INTERACTIVE_DESIGN = 503,
    DESIGN__PRODUCT_DESIGN = 504,
    DESIGN__TYPOGRAPHY = 505,
    FASHION = 600,
    FASHION__ACCESSORIES = 601,
    FASHION__APPAREL = 602,
    FASHION__CHILDRENSWEAR = 603,
    FASHION__COUTURE = 604,
    FASHION__FOOTWEAR = 605,
    FASHION__JEWELRY = 606,
    FASHION__PET_FASHION = 607,
    FASHION__READY_TO_WEAR = 608,
    FILM_AND_VIDEO = 700,
    FILM_AND_VIDEO__ACTION = 701,
    FILM_AND_VIDEO__ANIMATION = 702,
    FILM_AND_VIDEO__COMEDY = 703,
    FILM_AND_VIDEO__DOCUMENTARY = 704,
    FILM_AND_VIDEO__DRAMA = 705,
    FILM_AND_VIDEO__EXPERIMENTAL = 706,
    FILM_AND_VIDEO__FAMILY = 707,
    FILM_AND_VIDEO__FANTASY = 708,
    FILM_AND_VIDEO__FESTIVALS = 709,
    FILM_AND_VIDEO__HORROR = 710,
    FILM_AND_VIDEO__MOVIE_THEATERS = 711,
    FILM_AND_VIDEO__MUSIC_VIDEOS = 712,
    FILM_AND_VIDEO__NARRATIVE_FILM = 713,
    FILM_AND_VIDEO__ROMANCE = 714,
    FILM_AND_VIDEO__SCIENCE_FICTION = 715,
    FILM_AND_VIDEO__SHORTS = 716,
    FILM_AND_VIDEO__TELEVISION = 717,
    FILM_AND_VIDEO__THRILLERS = 718,
    FILM_AND_VIDEO__WEBSERIES = 719,
    FOOD = 800,
    FOOD__BACON = 801,
    FOOD__COMMUNITY_GARDENS = 801,
    FOOD__COOKBOOKS = 802,
    FOOD__DRINKS = 803,
    FOOD__EVENTS = 804,
    FOOD__FARMERS_MARKETS = 805,
    FOOD__FARMS = 806,
    FOOD__FOOD_TRUCKS = 807,
    FOOD__RESTAURANTS = 808,
    FOOD__SMALL_BATCH = 809,
    FOOD__SPACES = 810,
    FOOD__VEGAN = 811,
    GAMES = 900,
    GAMES__GAMING_HARDWARE = 901,
    GAMES__LIVE_GAMES = 902,
    GAMES__MOBILE_GAMES = 903,
    GAMES__PLAYING_CARDS = 904,
    GAMES__PUZZLES = 905,
    GAMES__TABLETOP_GAMES = 906,
    GAMES__VIDEO_GAMES = 907,
    JOURNALISM = 1000,
    JOURNALISM__AUDIO = 1001,
    JOURNALISM__PHOTO = 1002,
    JOURNALISM__VIDEO = 1003,
    JOURNALISM__WEB = 1004,
    MUSIC = 1100,
    MUSIC__BLUES = 1101,
    MUSIC__CHIPTUNE = 1102,
    MUSIC__CLASSICAL_MUSIC = 1103,
    MUSIC__COMEDY = 1104,
    MUSIC__COUNTRY_AND_FOLK = 1105,
    MUSIC__ELECTRONIC_MUSIC = 1106,
    MUSIC__FAITH = 1107,
    MUSIC__HIP_HOP = 1108,
    MUSIC__INDIE_ROCK = 1109,
    MUSIC__JAZZ = 1110,
    MUSIC__KIDS = 1111,
    MUSIC__LATIN = 1112,
    MUSIC__METAL = 1113,
    MUSIC__POP = 1114,
    MUSIC__PUNK = 1115,
    MUSIC__RNB = 1116,
    MUSIC__ROCK = 1117,
    MUSIC__WORLD_MUSIC = 1118,
    PHOTOGRAPHY = 1200,
    PHOTOGRAPHY__ANIMALS = 1201,
    PHOTOGRAPHY__FINE_ART = 1202,
    PHOTOGRAPHY__NATURE = 1203,
    PHOTOGRAPHY__PEOPLE = 1204,
    PHOTOGRAPHY__PHOTOBOOKS = 1205,
    PHOTOGRAPHY__PLACES = 1206,
    PUBLISHING = 1300,
    PUBLISHING__ACADEMIC = 1301,
    PUBLISHING__ANTHOLOGIES = 1302,
    PUBLISHING__ART_BOOKS = 1303,
    PUBLISHING__CALENDARS = 1304,
    PUBLISHING__CHILDRENS_BOOKS = 1305,
    PUBLISHING__COMEDY = 1306,
    PUBLISHING__FICTION = 1307,
    PUBLISHING__LETTERPRESS = 1308,
    PUBLISHING__LITERARY_JOURNALS = 1309,
    PUBLISHING__LITERARY_SPACES = 1310,
    PUBLISHING__NONFICTION = 1311,
    PUBLISHING__PERIODICALS = 1312,
    PUBLISHING__POETRY = 1313,
    PUBLISHING__RADIO_AND_PODCASTS = 1314,
    PUBLISHING__TRANSLATIONS = 1315,
    PUBLISHING__YOUNG_ADULT = 1316,
    PUBLISHING__ZINES = 1317,
    TECHNOLOGY = 1400,
    TECHNOLOGY__3D_PRINTING = 1401,
    TECHNOLOGY__APPS = 1402,
    TECHNOLOGY__CAMERA_EQUIPMENT = 1403,
    TECHNOLOGY__DIY_ELECTRONICS = 1404,
    TECHNOLOGY__FABRICATION_TOOLS = 1405,
    TECHNOLOGY__FLIGHT = 1406,
    TECHNOLOGY__GADGETS = 1407,
    TECHNOLOGY__HARDWARE = 1408,
    TECHNOLOGY__MAKERSPACES = 1409,
    TECHNOLOGY__ROBOTS = 1410,
    TECHNOLOGY__SOFTWARE = 1411,
    TECHNOLOGY__SPACE_EXPLORATION = 1412,
    TECHNOLOGY__WEARABLES = 1413,
    TECHNOLOGY__WEB = 1414,
    THEATER = 1500,
    THEATER__COMEDY = 1501,
    THEATER__EXPERIMENTAL = 1502,
    THEATER__FESTIVALS = 1503,
    THEATER__IMMERSIVE = 1504,
    THEATER__MUSICAL = 1505,
    THEATER__PLAYS = 1506,
    THEATER__SPACES = 1507,
}

export const primaryCategories = [
    Category.ART,
    Category.COMICS,
    Category.CRAFTS,
    Category.DANCE,
    Category.DESIGN,
    Category.FASHION,
    Category.FILM_AND_VIDEO,
    Category.FOOD,
    Category.GAMES,
    Category.JOURNALISM,
    Category.MUSIC,
    Category.PHOTOGRAPHY,
    Category.PUBLISHING,
    Category.TECHNOLOGY,
    Category.THEATER,
];

export function getPrimaryCategory(category: Category): Category {
    return Math.trunc(category / 100) * 100;
}

export function getPrimaryCategoryName(category: Category): string {
    // TODO i18n
    const primaryCategory = getPrimaryCategory(category);
    switch (primaryCategory) {
    case Category.ART:
        return 'Art';
    case Category.COMICS:
        return 'Comics';
    case Category.CRAFTS:
        return 'Crafts';
    case Category.DANCE:
        return 'Dance';
    case Category.DESIGN:
        return 'Design';
    case Category.FASHION:
        return 'Fashion';
    case Category.FILM_AND_VIDEO:
        return 'Film & Video';
    case Category.FOOD:
        return 'Food';
    case Category.GAMES:
        return 'Games';
    case Category.JOURNALISM:
        return 'Journalism';
    case Category.MUSIC:
        return 'Music';
    case Category.PHOTOGRAPHY:
        return 'Photography';
    case Category.PUBLISHING:
        return 'Publishing';
    case Category.TECHNOLOGY:
        return 'Technology';
    case Category.THEATER:
        return 'Theater';
    default:
        return '';
    }
}
