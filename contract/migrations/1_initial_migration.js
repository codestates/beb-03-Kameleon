const MyKIP7 = artifacts.require("MyKIP7");
const Govern = artifacts.require("Govern");
// const Exchange = artifacts.require("Exchange");

module.exports = async (deployer) => {
  const deploy_MyKip7 = await deployer.deploy(
    MyKIP7,
    "Kameleon",
    "KLT",
    "0x4120Bcc8547Fa737087481bE12cF94a01FC4Cc6A"
  );
  let deployed_MyKip7 = await MyKIP7.deployed();
  const deploy_Govern = await deployer.deploy(Govern, MyKIP7.address, "1000");
  let deployed_Govern = await Govern.deployed();
  console.log(deployed_MyKip7.address);
  console.log(deployed_Govern.address);
  //   let setAddress = await contractTwo.setAddress(
  //     One.address,
  //     { gas: 200000 }
  // );
};
