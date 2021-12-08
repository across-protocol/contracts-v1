const hre = require("hardhat");
const { getBytecode, getAbi } = require("@uma/contracts-node")

function getContract(name) {
    try {
        return hre.getContract(name);
    } catch (err) {
        hre._artifactCache[name] = { bytecode: getBytecode(name), abi: getAbi(name) };
        return hre.getContract(name);
    }
}

module.exports = {
    getContract
};