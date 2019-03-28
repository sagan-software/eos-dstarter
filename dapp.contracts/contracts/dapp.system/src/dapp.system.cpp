
#include <dapp.system/dapp.system.hpp>
#include "claimpledges.cpp"
#include "deldraft.cpp"
#include "delprofile.cpp"
#include "delreward.cpp"
#include "editprofile.cpp"
#include "killproject.cpp"
#include "newproject.cpp"
#include "pubproject.cpp"
#include "savebasics.cpp"
#include "savecontent.cpp"
#include "savereward.cpp"

namespace dapp
{

} // namespace dapp

EOSIO_DISPATCH(
    dapp::system,
    (claimpledges)(deldraft)(delprofile)(delreward)(killproject)(newproject)(pubproject)(savebasics)(savecontent)(savereward))
