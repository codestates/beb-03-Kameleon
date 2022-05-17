const Migrations = artifacts.require("Migrations");

// const Govern = artifacts.require("Govern");
// const Oracle = artifacts.require("Oracle");
// const Exchange = artifacts.require("Exchange");
// const Factory = artifacts.require("Factory");
// const Kameleon = artifacts.require("Kameleon");
// const KStockToken = artifacts.require("KStockToken");

module.exports = async (deployer) => {
  deployer.deploy(Migrations);

  // const deploy_Factory = await deployer.deploy(Factory);
  // let deployed_Factory = await Factory.deployed();
  // const deploy_Oracle = await deployer.deploy(Oracle);
  // let deployed_Oracle = await Oracle.deployed();
  // const deploy_Kameleon = await deployer.deploy(Kameleon, Factory.address);
  // let deployed_Kameleon = await Kameleon.deployed();
  // const deploy_Govern = await deployer.deploy(Govern, Kameleon.address, "1000");
  // let deployed_Govern = await Govern.deployed();
  // console.log("deployed_Factory : ", deployed_Factory.address);
  // console.log("deployed_Oracle : ", deployed_Oracle.address);
  // console.log("deployed_Kameleon : ", deployed_Kameleon.address);
  // console.log("deployed_Govern : ", deployed_Govern.address);
  //   let setAddress = await contractTwo.setAddress(
  //     One.address,
  //     { gas: 200000 }
  // );
};
