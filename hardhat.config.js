require("dotenv").config();

require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("solidity-coverage");
const tdly = require("@tenderly/hardhat-tenderly");

tdly.setup({
  automaticVerifications: true,
});
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const DEFAULT_ENDPOINT = "http://localhost:8545";
const DEFAULT_PRIVATE_KEY =
  "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";

const {
  PRIVATE_KEY,
  RINKEBY_URL,
  ROPSTEN_URL,
  KOVAN_URL,
  GOERLI_URL,
  ETHERSCAN_API_KEY,
} = process.env;

const kovanEndpoint = KOVAN_URL || DEFAULT_ENDPOINT;
const kovanPrivateKey = PRIVATE_KEY || DEFAULT_PRIVATE_KEY;

const ropstenEndpoint = ROPSTEN_URL || DEFAULT_ENDPOINT;
const ropstenPrivateKey = PRIVATE_KEY || DEFAULT_PRIVATE_KEY;

const goerliEndpoint = GOERLI_URL || DEFAULT_ENDPOINT;
const goerliPrivateKey = PRIVATE_KEY || DEFAULT_PRIVATE_KEY;

const rinkebyEndpoint = RINKEBY_URL || DEFAULT_ENDPOINT;
const rinkebyPrivateKey = PRIVATE_KEY || DEFAULT_PRIVATE_KEY;

const optimismGoerliPrivateKey = PRIVATE_KEY || DEFAULT_PRIVATE_KEY;

module.exports = {
  solidity: "0.8.4",
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
    },
    ropsten: {
      url: ropstenEndpoint,
      accounts: [ropstenPrivateKey],
      chainId: 3,
      allowUnlimitedContractSize: true,
    },
    rinkeby: {
      url: rinkebyEndpoint,
      accounts: [rinkebyPrivateKey],
      chainId: 4,
    },
    kovan: {
      url: kovanEndpoint,
      accounts: [kovanPrivateKey],
      chainId: 42,
    },
    goerli: {
      url: goerliEndpoint,
      accounts: [goerliPrivateKey],
      chainId: 5,
    },
    "optimism-goerli": {
      accounts: [optimismGoerliPrivateKey],
      chainId: 420,
      url: "https://optimism-goerli.infura.io/v3/7672e2bf7cbe427e8cd25b0f1dde65cf",
      companionNetworks: {
        hub: "goerli",
      },
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: {
      ropsten: `${ETHERSCAN_API_KEY}`,
      rinkeby: `${ETHERSCAN_API_KEY}`,
      kovan: `${ETHERSCAN_API_KEY}`,
      goerli: `${ETHERSCAN_API_KEY}`,
      "optimism-goerli": `${ETHERSCAN_API_KEY}`,
    },
    customChains: [
      {
        network: "optimism-goerli",
        chainId: 420,
        urls: {
          apiURL: "https://api-goerli-optimism.etherscan.io/api",
          browserURL: "https://goerli-optimism.etherscan.io",
        },
      },
    ],
  },
  settings: {
    optimizer: {
      enabled: true,
      runs: 10000,
    },
  },
};
