// This deploy script should be run on an optimism provider.
const { getAddress } = require("@uma/contracts-node");
const { ZERO_ADDRESS } = require("@uma/common");
const { getAddressFromNetworksDir } = require("../helpers/NetworkUtils");
const func = async function (hre) {
  const chainId = await hre.web3.eth.net.getId();

  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  // Map L2 chain IDs to L1 chain IDs to find associated bridgeAdmin addresses for a given L2 chain ID.
  const optimismL2ChainIdToL1 = {
    69: 42, // optimism testnet -> kovan
    10: 1 // optimism mainnet -> mainnet
  }

  const bobaL2ChainIdToL1 = {
    288: 1, // boba mainnet -> mainnet
    28: 4 // boba testnet -> rinkeby
  };

  let mainnetMessenger;
  if (chainId in optimismL2ChainIdToL1) {
    mainnetMessenger = getAddressFromNetworksDir("Optimism_Messenger", optimismL2ChainIdToL1[chainId])
  } else {
    mainnetMessenger =  getAddressFromNetworksDir("Boba_Messenger", bobaL2ChainIdToL1[chainId])
  }

  const l2ToL1 = { ...optimismL2ChainIdToL1, ...bobaL2ChainIdToL1 };

  const args = [
    mainnetMessenger,
    1800, // minimumBridgingDelay of 30 mins
    chainId,
    await getAddress("WETH9", l2ToL1[chainId]),
    "0x4200000000000000000000000000000000000006",
    getAddressFromNetworksDir("Optimism_Wrapper", l2ToL1[chainId]),
    ZERO_ADDRESS, // timer address
  ];

  await deploy("OVM_OETH_BridgeDepositBox", { from: deployer, args, log: true });
};
module.exports = func;
func.tags = ["OVM_OETH_BridgeDepositBox", "optimism", "boba"];
