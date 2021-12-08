# @across/contracts

This package contains the contracts for the Across Protocol. They have been audited by Open Zeppelin and tested
thoroughly in automated tests and on mainnet.

## Installing and building

To install:

```sh
yarn
```

To build:

```sh
yarn build
```

## Running tests

```sh
yarn test
```

## Deploying

This repo has a prepared set of deployment scripts. Since across is a multi-chain protocol, the deployment process will
involve multiple steps and some configuration transactions afterwards.

To do the basic mainnet deployment of across, you can run:

```sh
CUSTOM_NODE_URL=YOUR_NODE_URL_HERE MNEMONIC=YOUR_MNEMONIC_HERE yarn hardhat deploy --tags mainnet --network mainnet
```

This should print out a set of addresses. You should replace the addresses in `networks/1.json` with the addresses
printed.

Now you should be able to deploy to Arbitrum, Optimism, or Boba by running the same command with a new node url and
new network name:

```sh
CUSTOM_NODE_URL=ARBITRUM_NODE_HERE MNEMONIC=YOUR_MNEMONIC_HERE yarn hardhat deploy --tags arbitrum --network arbitrum
```

Once this is done, you will need to call the following methods to get things up and running:
- On the Arbitrum_Messenger, Optimism_Messenger, and Boba_Messenger, call `transferOwnership` to pass ownership to the
BridgeAdmin address.
- On the BridgeAdmin, call `setDepositContract` with the appropriate deposit box, chain id, and messenger for the L2
that you want to enable.
- On the BridgeAdmin, call `whitelistToken` to add the WETHBridgePool (or others that you deploy for other tokens) and
map it to a particular L2 WETH. This will also allow your L2 DepositBox to begin taking deposits in WETH. 