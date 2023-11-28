const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);

const contractsDir = path.resolve(__dirname, "contracts");
const contractFiles = fs.readdirSync(contractsDir).filter(file => file.endsWith(".sol"));

contractFiles.forEach(file => {
  const filePath = path.resolve(contractsDir, file);
  const source = fs.readFileSync(filePath, "utf8");

  const input = {
    language: "Solidity",
    sources: {
      [file]: {
        content: source,
      },
    },
    settings: {
      outputSelection: {
        "*": {
          "*": ["*"],
        },
      },
    },
  };

  const output = JSON.parse(solc.compile(JSON.stringify(input))).contracts[file];

  fs.ensureDirSync(buildPath);

  for (let contract in output) {
    fs.outputJsonSync(
      path.resolve(buildPath, contract.replace(":", "") + ".json"),
      output[contract]
    );
  }
});