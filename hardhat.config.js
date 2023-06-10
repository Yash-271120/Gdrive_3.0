require("@nomicfoundation/hardhat-toolbox");

const fs = require("fs");

const mnemonicPhrase = fs.readFileSync(".secret").toString().trim();
const infuraProjectId = fs.readFileSync(".infura").toString().trim();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    hardhat: {
      chainId: 1337
    },
    sepolia:{
      url: `https://sepolia.infura.io/v3/${infuraProjectId}`,
      accounts: {mnemonic: mnemonicPhrase, path: "m/44'/60'/0'/0", initialIndex: 0, count: 10},
    }
  }
  ,
  solidity: "0.8.16",
  paths: {
    artifacts:"./client/src/artifacts"
  }
};
