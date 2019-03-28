#include <dapp.system/dapp.system.hpp>

namespace dapp
{

void system::savebasics(
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
    const optional<uint8_t> duration_days,
    const vector<string> &tags)
{
    // Make sure a project exists with that slug

    // Make sure we have authority over the project

    // Make sure the project is a draft
}

} // namespace dapp