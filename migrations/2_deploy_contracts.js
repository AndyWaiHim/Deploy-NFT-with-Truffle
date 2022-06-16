const PremiumDog = artifacts.require('PremiumDog.sol');

module.exports = function (deployer) {
    deployer.deploy(PremiumDog);
};