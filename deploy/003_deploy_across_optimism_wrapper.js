const { getAddress } = require("@uma/contracts-node");
const func = async function (hre) {
  const chainId = await hre.web3.eth.net.getId();

  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  const bridgePool = (await deployments.get("WETHBridgePool")).address;

  const args = [
    await getAddress("WETH9", chainId),
    bridgePool
  ];

  await deploy("Optimism_Wrapper", { from: deployer, args, log: true });
};
module.exports = func;
func.tags = ["Optimism_Wrapper", "mainnet"];
