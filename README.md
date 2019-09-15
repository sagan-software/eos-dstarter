## Routes

### `/`

### `/:account_name`

### `/:account_name/donate`

### `/:account_name/donors`



## Architecture

### Decentralized as possible

Static web app using EOSIO RPC API and IPFS. No backend.

#### Pros

- Easy to scale
- Low maintanence cost
- Centralized features can be added piecemeal
- Data is as fresh as possible

#### Cons

- Worse performance
- Harder to engineer
- SEO hit

### Decentralized data, centralized servers

More traditional web app with server-rendered HTML backend.

#### Pros

- Better performance
- Easier to engineer
- Better SEO

#### Cons

- Harder to scale
- More expensive to maintain
- Centralized
- Data can be slower to sync