
const path = require("path");
const fs = require("fs");
const networksPath = path.join(__dirname, "../networks");;

function getAddressFromNetworksDir(name, chainId) {
    const deployments = JSON.parse(fs.readFileSync(path.join(networksPath, `${chainId}.json`)));
    return deployments.find(deployment => deployment.contractName === name || deployment.deploymentName === name).address;
}

module.exports = {
    getAddressFromNetworksDir
};