const func = async function (hre) {
    const chainId = await hre.web3.eth.net.getId();
  
    const { deployments, getNamedAccounts } = hre;
    const { deploy } = deployments;
  
    const { deployer } = await getNamedAccounts();
  
    // Maps chainID to optimism cross-domain messenger contract
    const l1ChainIdToInbox = {
      4: "0x578BAde599406A8fE3d24Fd7f7211c0911F5B29e", // rinkeby
      1: "0x4Dbd4fc535Ac27206064B68FfCf827b0A60BAB3f", // mainnet
    };
  
    await deploy("Arbitrum_Messenger", { from: deployer, args: [l1ChainIdToInbox[chainId]], log: true });
  };
  module.exports = func;
  func.tags = ["Arbitrum_Messenger", "mainnet"];
  