
#include "contract.hpp"
#include "actions/claimpledges.cpp"
#include "actions/deldraft.cpp"
#include "actions/delprofile.cpp"
#include "actions/delreward.cpp"
#include "actions/editprofile.cpp"
#include "actions/killproject.cpp"
#include "actions/newproject.cpp"
#include "actions/pubproject.cpp"
#include "actions/savebasics.cpp"
#include "actions/savecontent.cpp"
#include "actions/savereward.cpp"

EOSIO_DISPATCH(
    dapp::system,
    (claimpledges)(deldraft)(delprofile)(delreward)(killproject)(newproject)(pubproject)(savebasics)(savecontent)(savereward))
