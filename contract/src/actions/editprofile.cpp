#include "../contract.hpp"

namespace dapp
{

void system::editprofile(
    const name account,
    const string display_name,
    const string avatar_hash,
    const string biography,
    const vector<string> &websites)
{
    require_auth(account);

    check(display_name.size() <= 60, "display name cannot be greater than 60 characters");
    check(biography.size() <= 300, "biography cannot be greater than 300 characters");
    check(websites.size() <= 10, "cannot have more than 10 websites");
    for (auto url : websites)
    {
        check(url.size() <= 300, "URL cannot be greater than 255 characters");
    }

    auto itr = _profiles.find(account.value);
    if (itr == _profiles.end())
    {
        // Create a new profile
        _profiles.emplace(account, [&](auto &profile) {
            profile.account = account;
            profile.display_name = display_name;
            profile.avatar_hash = avatar_hash;
            profile.biography = biography;
            profile.websites = websites;
        });
    }
    else
    {
        // Update an existing profile
        _profiles.modify(itr, account, [&](auto &profile) {
            profile.display_name = display_name;
            profile.avatar_hash = avatar_hash;
            profile.biography = biography;
            profile.websites = websites;
        });
    }
}

} // namespace dapp