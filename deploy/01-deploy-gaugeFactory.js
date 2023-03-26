const { network } = require("hardhat")
const { developmentChains, VERIFICATION_BLOCK_CONFIRMATIONS } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")
const { arbitrumConfig } = require("../tasks/constants/arbitrumConfig")
const { testArbitrumConfig } = require("../tasks/constants/testArbitrumConfig")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const mainnet = false
    const WETH = "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1"
    //const ARB_CONFIG = mainnet ? arbitrumConfig : testArbitrumConfig

    const waitBlockConfirmations = developmentChains.includes(network.name)
        ? 1
        : VERIFICATION_BLOCK_CONFIRMATIONS

    log("----------------------------------------------------")
    const arguments = []
    const gaugeFactory = await deploy("GaugeFactory", {
        from: deployer,
        args: arguments,
        log: true,
        waitConfirmations: waitBlockConfirmations,
    })

    const bribeFactory = await deploy("BribeFactory", {
        from: deployer,
        args: arguments,
        log: true,
        waitConfirmations: waitBlockConfirmations,
    })

    const pairFactory = await deploy("PairFactory", {
        from: deployer,
        args: arguments,
        log: true,
        waitConfirmations: waitBlockConfirmations,
    })

    const artProxy = await deploy("VeArtProxy", {
        from: deployer,
        args: arguments,
        log: true,
        waitConfirmations: waitBlockConfirmations,
    })

    const bpln = await deploy("Bpln", {
        from: deployer,
        args: arguments,
        log: true,
        waitConfirmations: waitBlockConfirmations,
    })

    const arguments1 = [pairFactory.address, WETH]
    const router = await deploy("Router", {
        from: deployer,
        args: arguments1,
        log: true,
        waitConfirmations: waitBlockConfirmations,
    })

    const arguments2 = [router.address]
    const library = await deploy("BiplaneLibrary", {
        from: deployer,
        args: arguments2,
        log: true,
        waitConfirmations: waitBlockConfirmations,
    })

    const arguments3 = [bpln.address, artProxy.address]
    const escrow = await deploy("VotingEscrow", {
        from: deployer,
        args: arguments3,
        log: true,
        waitConfirmations: waitBlockConfirmations,
    })

    const arguments4 = [escrow.address]
    const governor = await deploy("BplnGovernor", {
        from: deployer,
        args: arguments4,
        log: true,
        waitConfirmations: waitBlockConfirmations,
    })

    const arguments5 = [
        escrow.address,
        pairFactory.address,
        gaugeFactory.address,
        bribeFactory.address,
    ]
    const voter = await deploy("Voter", {
        from: deployer,
        args: arguments5,
        log: true,
        waitConfirmations: waitBlockConfirmations,
    })

    const arguments6 = [escrow.address]
    const distributor = await deploy("RewardsDistributor", {
        from: deployer,
        args: arguments6,
        log: true,
        waitConfirmations: waitBlockConfirmations,
    })

    const arguments7 = [voter.address, escrow.address, distributor.address]
    const minter = await deploy("Minter", {
        from: deployer,
        args: arguments7,
        log: true,
        waitConfirmations: waitBlockConfirmations,
    })

    const arguments8 = [voter.address]
    const weBribeFactory = await deploy("WrappedExternalBribeFactory", {
        from: deployer,
        args: arguments8,
        log: true,
        waitConfirmations: waitBlockConfirmations,
    })

    // Verify the deployment
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...")
        await verify(gaugeFactory.address, args)
        await verify(bribeFactory.address, args)
        await verify(pairFactory.address, args)
        await verify(artProxy.address, args)
        await verify(bpln.address, args)
        await verify(router.address, args)
        await verify(library.address, args)
        await verify(escrow.address, args)
        await verify(governor.address, args)
        await verify(voter.address, args)
        await verify(distributor.address, args)
        await verify(minter.address, args)
        await verify(weBribeFactory.address, args)
    }
    log("----------------------------------------------------")

    // Initialize
    //   await bpln.initialMint(ARB_CONFIG.teamEOA);
    //   console.log("Initial minted");

    //   await bpln.setRedemptionReceiver(receiver.address);
    //   console.log("RedemptionReceiver set");

    //   await bpln.setMerkleClaim(claim.address);
    //   console.log("MerkleClaim set");

    //   await bpln.setMinter(minter.address);
    //   console.log("Minter set");

    //   await pairFactory.setPauser(ARB_CONFIG.teamMultisig);
    //   console.log("Pauser set");

    //   await escrow.setVoter(voter.address);
    //   console.log("Voter set");

    //   await escrow.setTeam(ARB_CONFIG.teamMultisig);
    //   console.log("Team set for escrow");

    //   await voter.setGovernor(ARB_CONFIG.teamMultisig);
    //   console.log("Governor set");

    //   await voter.setEmergencyCouncil(ARB_CONFIG.teamMultisig);
    //   console.log("Emergency Council set");

    //   await distributor.setDepositor(minter.address);
    //   console.log("Depositor set");

    //   await receiver.setTeam(ARB_CONFIG.teamMultisig)
    //   console.log("Team set for receiver");

    //   await governor.setTeam(ARB_CONFIG.teamMultisig)
    //   console.log("Team set for governor");

    //   // Whitelist
    //   const nativeToken = [bpln.address];
    //   const tokenWhitelist = nativeToken.concat(ARB_CONFIG.tokenWhitelist);
    //   await voter.initialize(tokenWhitelist, minter.address);
    //   console.log("Whitelist set");

    //   // Initial veBPLN distro
    //   await minter.initialize(
    //     ARB_CONFIG.partnerAddrs,
    //     ARB_CONFIG.partnerAmts,
    //     ARB_CONFIG.partnerMax
    //   );
    //   console.log("veBPLN distributed");

    //   await minter.setTeam(ARB_CONFIG.teamMultisig)
    //   console.log("Team set for minter");

    //   console.log("Arbitrum contracts deployed");

    module.exports.tags = [
        "all",
        "gaugeFactory",
        "bribeFactory",
        "pairFactory",
        "artProxy",
        "bpln",
        "router",
        "library",
        "escrow",
        "governor",
        "voter",
        "distributor",
        "minter",
    ]
}
