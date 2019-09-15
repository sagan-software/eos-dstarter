#include "../contract.hpp"

namespace dapp
{

void system::newproject(
    const name account,
    const name draft_name,
    const uint16_t category,
    const string &description)
{
    require_auth(account);

    // TODO validate category
    // TODO validate description

    projects_table drafts(_self, account.value);

    auto draft = drafts.find(draft_name.value);

    // Make sure this slug isn't already taken
    check(draft == drafts.end(), "draft already exists");

    // Create the draft
    draft = drafts.emplace(account, [&](auto &new_draft) {
        new_draft.project_name = draft_name;
        new_draft.creator = account;
        new_draft.category = category;
        new_draft.subtitle = description;
    });
}

} // namespace dapp