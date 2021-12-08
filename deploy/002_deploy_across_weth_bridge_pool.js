const { getAddress } = require("@uma/contracts-node");
const { ZERO_ADDRESS } = require("@uma/common");
const func = async function (hre) {
  const chainId = await hre.web3.eth.net.getId();

  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  const bridgeAdmin = (await deployments.get("BridgeAdmin")).address;

  const args = [
    "Across WETH LP",
    "A-WETH-LP",
    bridgeAdmin,
    await getAddress("WETH9", chainId),
    "1500000000000", // 0.0000015
    true,
    ZERO_ADDRESS
  ];

  await deploy("WETHBridgePool", { from: deployer, args, log: true, contract: "BridgePool" });
};
module.exports = func;
func.tags = ["Optimism_Wrapper", "mainnet"];