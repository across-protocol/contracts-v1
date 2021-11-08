const { getHardhatConfig } = require("@uma/common");
const { TASK_COMPILE_SOLIDITY_GET_SOURCE_PATHS } = require("hardhat/builtin-tasks/task-names");

const glob = require("glob").sync;
const path = require("path");

let typechain = undefined;
if (process.env.TYPECHAIN === "web3") {
  typechain = { outDir: "contract-types/web3", target: "web3-v1", alwaysGenerateOverloads: false };
} else if (process.env.TYPECHAIN === "ethers") {
  typechain = { outDir: "contract-types/ethers", target: "ethers-v5", alwaysGenerateOverloads: false };
}

if (typechain !== undefined) require("@typechain/hardhat");

const configOverride = {
  paths: {
    root: __dirname,
    sources: path.join(__dirname, "contracts"),
    artifacts: path.join(__dirname, "artifacts"),
    cache: path.join(__dirname, "cache"),
    tests: path.join(__dirname, "test"),
  },
  typechain,
};

const hardhatConfig = getHardhatConfig(configOverride, __dirname, false);

module.exports = hardhatConfig;
