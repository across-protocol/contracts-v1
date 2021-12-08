const func = async function (hre) {
    const chainId = await hre.web3.eth.net.getId();
  
    const { deployments, getNamedAccounts } = hre;
    const { deploy } = deployments;
  
    const { deployer } = await getNamedAccounts();
  
    // Maps chainID to boba cross-domain messenger contract
    const l1ChainIdToMessenger = {
      4: "0xF10EEfC14eB5b7885Ea9F7A631a21c7a82cf5D76", // rinkeby
      1: "0x6D4528d192dB72E282265D6092F4B872f9Dff69e", // mainnet
    };
  
    await deploy("Boba_Messenger", { from: deployer, args: [l1ChainIdToMessenger[chainId]], log: true, contract: "Optimism_Messenger" });
  };
  module.exports = func;
  func.tags = ["Boba_Messenger", "mainnet"];
  