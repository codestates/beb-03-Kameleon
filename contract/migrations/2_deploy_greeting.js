var KlaytnGreeter = artifacts.require("KlaytnGreeter");

module.exports = function (deployer) {
  deployer.deploy(KlaytnGreeter);
};
