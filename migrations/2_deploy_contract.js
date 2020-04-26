const SmartMatrix = artifacts.require("SmartMatrixForsage");

module.exports = async function (deployer, network, accounts) {
    await deployer.deploy(SmartMatrix, accounts[0] );
};