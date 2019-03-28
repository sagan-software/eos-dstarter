#pragma once

#include <eosiolib/eosio.hpp>
#include <eosiolib/asset.hpp>
#include <eosiolib/time.hpp>

namespace dapp
{

using namespace std;
using namespace eosio;

enum project_goal_type : uint8_t
{
    ALL_OR_NOTHING = 1,
    FLEXIBLE = 2,
};

bool is_valid_goal_type(const uint8_t value)
{
    return value == ALL_OR_NOTHING || value == FLEXIBLE;
}

enum project_stage : uint8_t
{
    CONCEPT = 1,
    PROTOTYPE = 2,
    PRODUCTION = 3,
    SHIPPING = 4,
};

bool is_valid_project_stage(const uint8_t value)
{
    return value <= CONCEPT && value <= SHIPPING;
}

struct project_reward_item
{
    string name;
    uint16_t quantity;
};

struct project_reward
{
    string title;
    string description;
    asset pledge_amount;
    vector<project_reward_item> items;
    time_point_sec estimated_delivery;
    uint32_t start_quantity;
    uint32_t current_quantity;
    time_point_sec start_time;
    time_point_sec end_time;
};

struct [[ eosio::table, eosio::contract("dapp.system") ]] project
{
    name project_name;
    name creator;
    string title;
    string subtitle;
    asset goal_amount;
    uint8_t goal_type = FLEXIBLE;
    uint8_t stage = CONCEPT;
    uint16_t category;
    vector<string> tags;
    string image_hash;
    string video_hash;
    string story_hash;
    vector<project_reward> rewards;
    time_point_sec start_time;
    time_point_sec end_time;
    uint8_t duration_days;
    asset pleged_total;
    asset pleged_claimed;

    auto primary_key() const { return project_name.value; }
    uint64_t by_category() const { return (uint64_t)category; }
};

typedef eosio::multi_index<
    "projects"_n,
    project,
    indexed_by<
        "category"_n,
        const_mem_fun<project, uint64_t, &project::by_category>>>
    projects_table;

struct [[ eosio::table, eosio::contract("dapp.system") ]] backer
{
    uint64_t id;
    name project_slug;
    name account;
    asset pledged;
    optional<uint16_t> reward_index;

    auto primary_key() const { return id; }
};

enum project_category : uint16_t
{
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
};

} // namespace dapp