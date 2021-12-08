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
  const arbitrumL2ChainIdToL1 = {
    42161: 1, // arbitrum mainnet -> mainnet
    421611: 4 // arbitrum testnet -> rinkeby
  };

  // Map L2 chain IDs to L1 gateway addresses.
  const l2GatewayAddressMap = {
    42161: "0x5288c571Fd7aD117beA99bF60FE0846C4E84F933", // arbitrum mainnet
    421611: "0x9413AD42910c1eA60c737dB5f58d1C504498a3cD" // arbitrum testnet
  };

  
  const mainnetMessenger = await getAddressFromNetworksDir("Arbitrum_Messenger", arbitrumL2ChainIdToL1[chainId])

  const args = [
    l2GatewayAddressMap[chainId],
    mainnetMessenger,
    1800, // minimumBridgingDelay of 30 mins
    chainId,
    await getAddress("WETH9", arbitrumL2ChainIdToL1[chainId]),
    ZERO_ADDRESS, // timer address
  ];

  await deploy("AVM_BridgeDepositBox", { from: deployer, args, log: true });
};
module.exports = func;
func.tags = ["AVM_BridgeDepositBox", "arbitrum"];