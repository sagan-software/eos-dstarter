#pragma once

#include <eosiolib/eosio.hpp>
#include <eosiolib/asset.hpp>
#include <eosiolib/time.hpp>
#include "profile.hpp"
#include "project.hpp"
#include "project_categories.hpp"

namespace dapp
{
using namespace std;
using namespace eosio;

class[[eosio::contract("contract")]] system : public eosio::contract
{
  private:
    profiles_table _profiles;
    projects_table _projects;

  public:
    using contract::contract;

    system(name receiver, name code, datastream<const char *> ds) : contract(receiver, code, ds),
                                                                    _profiles(receiver, receiver.value),
                                                                    _projects(receiver, receiver.value){};

    [[eosio::action]] void claimpledges(
        const name project_name);

    [[eosio::action]] void deldraft(
        const name account,
        const name draft_name);

    [[eosio::action]] void delreward(
        const name account,
        const name draft_name,
        const uint8_t reward_index);

    [[eosio::action]] void delprofile(
        const name account);

    [[eosio::action]] void editprofile(
        const name account,
        const string display_name,
        const string avatar_hash,
        const string biography,
        const vector<string> &websites);

    [[eosio::action]] void killproject(
        const name project_name);

    [[eosio::action]] void newproject(
        const name account,
        const name draft_name,
        const uint16_t category,
        const string &description);

    [[eosio::action]] void pubproject(
        const name account,
        const name draft_name,
        const name live_name);

    [[eosio::action]] void savebasics(
        const name account,
        const name draft_name,
        const string &title,
        const string &subtitle,
        const asset &goal_amount,
        const uint8_t goal_type,
        const uint8_t stage,
        const uint16_t category,
        const time_point_sec start_time,
        const time_point_sec end_time,
        const uint8_t duration_days,
        const vector<string> &tags);

    [[eosio::action]] void savecontent(
        const name account,
        const name draft_name,
        const string image_hash,
        const string video_hash,
        const string story_hash);

    [[eosio::action]] void savereward(
        const name account,
        const name draft_name,
        const uint8_t reward_index,
        const string &title,
        const string &description,
        const asset &pledge_amount,
        const vector<project_reward_item> &items,
        const time_point_sec estimated_delivery,
        const uint32_t initial_quantity,
        const time_point_sec start_time,
        const time_point_sec end_time);
};

} // namespace dapp