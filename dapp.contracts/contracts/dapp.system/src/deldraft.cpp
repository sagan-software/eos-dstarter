#include <dapp.system/dapp.system.hpp>

namespace dapp
{

void system::deldraft(
    const name account,
    const name draft_name)
{
    require_auth(account);

    projects_table drafts(_self, account.value);

    auto itr = drafts.find(draft_name.value);
    check(itr != drafts.end(), "draft doesn't exist");
    drafts.erase(*itr);
    check(itr != drafts.end(), "draft not erased properly");
}

} // namespace dapp