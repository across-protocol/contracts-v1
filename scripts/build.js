#!/usr/bin/env node

const hre = require("hardhat");
const uniqBy = require("lodash.uniqby");
const fs = require("fs");
const path = require("path");


async function main() {
    const artifactPaths = await hre.artifacts.getArtifactPaths();

    const json = uniqBy(
        artifactPaths.map((artifactPath) => ({
          contractName: path.basename(artifactPath).split(".")[0],
          relativePath: `./${path.relative(path.join(__dirname, ".."), artifactPath)}`
        })),
        "contractName"
      );

    const buildDir = path.join(__dirname, "..", "build");

    if (!fs.existsSync(buildDir)){
      fs.mkdirSync(buildDir);
    }

    fs.writeFileSync(path.join(buildDir, "artifacts.json"), JSON.stringify(json, undefined, 2));
}

main().then(
    () => process.exit(0),
    (error) => {
        console.log(error);
        process.exit(1);
    }
);