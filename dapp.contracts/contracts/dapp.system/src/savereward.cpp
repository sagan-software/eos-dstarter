#include <dapp.system/dapp.system.hpp>

namespace dapp
{

void system::savereward(
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
    const time_point_sec end_time)
{
    // Make sure a project exists with that slug

    // Make sure we have authority over the project

    // Make sure the project is a draft

    // If reward_index is defined then make sure it is valid

    // Otherwise create a new reward

    // Save the project
}

} // namespace dapp