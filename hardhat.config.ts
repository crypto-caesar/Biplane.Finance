import "@nomiclabs/hardhat-ethers"
import "@nomiclabs/hardhat-etherscan"
import "@nomiclabs/hardhat-waffle"
import "@typechain/hardhat"
import "hardhat-preprocessor"
import "hardhat-abi-exporter"
import "hardhat-deploy"

//import "./tasks/accounts"
//import "./tasks/deploy"

import fs from "fs"
import { resolve } from "path"

import { config as dotenvConfig } from "dotenv"
import { HardhatUserConfig, task } from "hardhat/config"

dotenvConfig({ path: resolve(__dirname, "./.env") })

const remappings = fs
    .readFileSync("remappings.txt", "utf8")
    .split("\n")
    .filter(Boolean)
    .map((line) => line.trim().split("="))

const config: HardhatUserConfig = {
    networks: {
        hardhat: {
            initialBaseFeePerGas: 0,
            // forking: {
            //     url: `https://arb-goerli.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
            //     blockNumber: 9967367,
            // },
        },
        localhost: {
            chainId: 31337,
        },
        arbitrumMainnet: {
            url: "https://arb1.arbitrum.io/rpc",
            accounts: [process.env.PRIVATE_KEY!],
        },
        arbitrumGoerli: {
            url: "https://arb-goerli.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}",
            accounts: [process.env.PRIVATE_KEY!],
        },
    },
    solidity: {
        version: "0.8.13",
        settings: {
            optimizer: {
                enabled: true,
                runs: 200,
            },
        },
    },
    // This fully resolves paths for imports in the ./lib directory for Hardhat
    preprocess: {
        eachLine: (hre) => ({
            transform: (line: string) => {
                if (!line.match(/^\s*import /i)) {
                    return line
                }

                const remapping = remappings.find(([find]) => line.match('"' + find))
                if (!remapping) {
                    return line
                }

                const [find, replace] = remapping
                return line.replace('"' + find, '"' + replace)
            },
        }),
    },
    etherscan: {
        apiKey: {
            arbitrumMainnet: process.env.ARBISCAN_API_KEY!,
            arbitrumGoerli: process.env.ARBISCAN_API_KEY!,
        },
    },
    namedAccounts: {
        deployer: {
            default: 0, // here this will by default take the first account as deployer
        },
    },
}

export default config
