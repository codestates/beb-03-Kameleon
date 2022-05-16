import Caver from "caver-js";
require("dotenv").config();
const caver = new Caver(process.env.BAOBAB_NETWORK);

import { abiList, byteCodeList } from "./contractData";

const deployerKeyring = caver.wallet.keyring.create(
  process.env.feeAddress,
  process.env.feePrivateKey
);
caver.wallet.add(deployerKeyring);

const deployContract = async ({
  contractName,
  parameters = [],
}: {
  contractName: string;
  parameters?: Array<String>;
}) => {
  try {
    if (contractName === undefined) throw "Not enough arguments";
    const contract = caver.contract.create(abiList[contractName]);
    const delployedContract = await contract.deploy(
      {
        from: deployerKeyring.address,
        gas: 5000000,
      },
      byteCodeList[contractName],
      ...parameters
    );
    console.log(
      `The address of deployed smart contract: ${delployedContract.options.address}`
    );
    return delployedContract.options.address;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const callContract = async ({
  contractName,
  contractAddress,
  methodName,
  parameters = [],
}: {
  contractName: string;
  contractAddress: string;
  methodName: string;
  parameters?: Array<String>;
}) => {
  try {
    if (
      contractName === undefined ||
      contractAddress === undefined ||
      methodName === undefined
    )
      throw "Not enough arguments";
    const contract = caver.contract.create(
      abiList[contractName],
      contractAddress
    );
    const callResult = await contract.call(methodName, ...parameters);
    console.log(`Result of calling get function with key: ${callResult}`);
    return callResult;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const sendContract = async ({
  contractName,
  contractAddress,
  methodName,
  parameters = [],
}: {
  contractName: string;
  contractAddress: string;
  methodName: string;
  parameters?: Array<String>;
}) => {
  try {
    if (
      contractName === undefined ||
      contractAddress === undefined ||
      methodName === undefined
    )
      throw "Not enough arguments";
    const contract = caver.contract.create(
      abiList[contractName],
      contractAddress
    );
    const receipt = await contract.send(
      {
        from: deployerKeyring.address,
        gas: 3000000,
      },
      methodName,
      ...parameters
    );
    console.log(receipt);
    return receipt;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const multiMint = () => {
  const CronJob = require("cron").CronJob;
  const job = new CronJob("0 0 */1 * * *", function () {
    sendContract({
      contractName: "MyKIP7",
      contractAddress: "",
      methodName: "multiMint",
    });
  });
  job.start();
};

const lpPoolTotalSupply = () => {
  const CronJob = require("cron").CronJob;
  const job = new CronJob("*/60 * * * * *", async () => {
    const contractAddress = "0x9ae71CA5Babd51D1Cdda1785091Dab28866C54C9";
    callContract({
      contractName: "MyKIP7",
      contractAddress,
      methodName: "totalSupply",
    });
  });
  job.start();
};

// how to use

// deployContract({ contractName: "MyKIP7" });

// const contractAddress = "0x9ae71CA5Babd51D1Cdda1785091Dab28866C54C9";
// callContract({
//   contractName: "MyKIP7",
//   contractAddress,
//   methodName: "totalSupply",
// });

// const contractAddress = "0x9ae71CA5Babd51D1Cdda1785091Dab28866C54C9";
// sendContract({
//   contractName: "MyKIP7",
//   contractAddress,
//   methodName: "approve",
//   parameters: [process.env.feeAddress, "1000000"],
// });

// multiMint();

export { deployContract, callContract, sendContract, multiMint };
