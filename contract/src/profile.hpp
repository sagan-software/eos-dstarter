#pragma once

#include <eosiolib/eosio.hpp>

namespace dapp
{
using namespace std;
using namespace eosio;

struct [[ eosio::table, eosio::contract("dapp.system") ]] profile
{
    name account;
    string display_name;
    string avatar_hash;
    string biography;
    vector<string> websites;
    time_point_sec created_time;

    auto primary_key() const { return account.value; }
};

typedef eosio::multi_index<"profiles"_n, profile> profiles_table;

} // namespace dapp