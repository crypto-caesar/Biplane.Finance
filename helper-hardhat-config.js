const networkConfig = {
    default: {
        name: "hardhat",
        //keepersUpdateInterval: "30",
    },
    31337: {
        name: "localhost",
        // subscriptionId: "9113",
        // gasLane: "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc", // 30 gwei
        // keepersUpdateInterval: "30",
        // raffleEntranceFee: "100000000000000000", // 0.1 ETH
        // callbackGasLimit: "500000", // 500,000 gas
    },
    421613: {
        name: "ARB_GOERLI",
        // subscriptionId: "9113",
        // gasLane: "0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15", // 30 gwei
        // keepersUpdateInterval: "30",
        // raffleEntranceFee: "100000000000000000", // 0.1 ETH
        // callbackGasLimit: "500000", // 500,000 gas
    },
    42161: {
        name: "ARB_MAINNET",
        //keepersUpdateInterval: "30",
    },
}

const developmentChains = ["hardhat", "localhost"]
const VERIFICATION_BLOCK_CONFIRMATIONS = 6
//const frontEndContractsFile = "../nextjs-nft-marketplace-graph-fcc/constants/networkMapping.json"
//const frontEndContractsFile2 = "../nextjs-nft-marketplace-thegraph-fcc/constants/networkMapping.json"
//const frontEndAbiLocation = "../nextjs-nft-marketplace-graph-fcc/constants/"
//const frontEndAbiLocation2 = "../nextjs-nft-marketplace-thegraph-fcc/constants/"

module.exports = {
    networkConfig,
    developmentChains,
    VERIFICATION_BLOCK_CONFIRMATIONS,
    //frontEndContractsFile,
    //frontEndContractsFile2,
    //frontEndAbiLocation,
    //frontEndAbiLocation2,
}
