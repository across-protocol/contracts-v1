const { getHardhatConfig } = require("@uma/common");

let typechain = undefined;
if (process.env.TYPECHAIN === "web3") {
  typechain = { outDir: "contract-types/web3", target: "web3-v1", alwaysGenerateOverloads: false };
} else if (process.env.TYPECHAIN === "ethers") {
  typechain = { outDir: "contract-types/ethers", target: "ethers-v5", alwaysGenerateOverloads: false };
}

if (typechain !== undefined) require("@typechain/hardhat");

const configOverride = {
  typechain
};

const hardhatConfig = getHardhatConfig(configOverride, __dirname, false);

require("./tasks/acrossPool");

// To allow customizing the chain id when forking, allow the user to provide an env variable.
if (process.env.HARDHAT_CHAIN_ID) hardhatConfig.networks.hardhat.chainId = parseInt(process.env.HARDHAT_CHAIN_ID);

// To better support forking, drop accounts when the mnemonic doesn't exist.
if (!process.env.MNEMONIC) Object.values(hardhatConfig.networks).forEach(network => delete network.accounts);

module.exports = hardhatConfig;
