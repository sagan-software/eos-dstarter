use eosio::*;

#[derive(Table, Read, Write, NumBytes, PartialEq, PartialOrd, Clone, Debug, Default)]
#[table_name = "projects"]
pub struct Project {
    #[primary]
    pub id: Name,
    pub creator: AccountName,
    pub ipfs_hash: String,
    pub start_time: TimePointSec,
    pub end_time: TimePointSec,
    pub goal_amount: ExtendedAsset,
    pub goal_type: u8,
    pub pledged_total: u64,
    pub pledged_claimed: u64,
    pub rewards: Vec<Reward>,
}

#[derive(Read, Write, NumBytes, PartialEq, PartialOrd, Clone, Debug, Default)]
pub struct Reward {
    pub min_pledge: u64,
    pub available: Option<u32>,
    pub start_time: Option<TimePointSec>,
    pub end_time: Option<TimePointSec>,
}

#[derive(Table, Read, Write, NumBytes, PartialEq, PartialOrd, Clone, Debug, Default)]
#[table_name = "backers"]
pub struct Backer {
    #[primary]
    pub id: u64,
    pub project_id: Name,
    pub account: AccountName,
    pub pledged: u64,
    pub reward: Option<usize>,
}
