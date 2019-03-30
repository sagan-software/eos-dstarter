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

}