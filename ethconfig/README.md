## Instructions
- `npm install`
- then, from this directory...
- `npx truffle develop`

## truffle(develop)> commands

### deploy our NFT to our development blockchain
- migrate

### use our deployed contract
- nft = await ERC721PresetMinterPauserAutoId.deployed()

### interact with our Token
- await nft.name()
- await nft.symbol()

### mint
- minting abridged: If you are using an account with a minter role, you can send a transaction ot mint tokens to a specified account
- in this development case, we are minting from the account that deployed to token (minter role)
- await nft.mint("[truffle development account]")
- confirm it was minted to the specified account (whatever you put as [truffle development account])
- await nft.ownerOf(0)
- await nft.tokenURI(0)
