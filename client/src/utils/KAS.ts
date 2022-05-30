import Caver from 'caver-js';

import {
  abiTable,
  exchangeAddressTable,
  kStockTokenAddressTable,
} from './../constants/index';

export const callCaver = new Caver('https://api.baobab.klaytn.net:8651');
const caver = new Caver(window.klaytn);

const callIsApproved = async ({ stockName }: { stockName: string }) => {
  const res = await callContract({
    contractName: 'KStockToken',
    contractAddress: kStockTokenAddressTable[stockName],
    methodName: 'allowance',
    parameters: [
      window.klaytn.selectedAddress,
      exchangeAddressTable[stockName],
    ],
  });
  return res.length >= 76;
};

const sendApprove = async ({ stockName }: { stockName: string }) => {
  try {
    const result: any = await sendContract({
      contractName: 'KStockToken',
      contractAddress: kStockTokenAddressTable[stockName],
      methodName: 'approve',
      parameters: [
        exchangeAddressTable[stockName],
        '115792089237316195423570985008687907853269984665640564039457584007913129639935', // maximum value
      ],
    });
    return result;
  } catch (error) {
    // console.log(error);
    return error;
  }
};

// const testContract = async ({
//   contractName,
//   contractAddress,
//   methodName,
//   parameters = [],
//   account = undefined,
// }: {
//   contractName: string;
//   contractAddress: string;
//   methodName: string;
//   parameters?: Array<string | number>;
//   kaikas?: boolean;
//   account?: string | undefined;
// }) => {
//   console.log('?????', parameters);
//   const contract = new callCaver.klay.Contract(
//     abiTable[contractName],
//     contractAddress
//   );
//   const receipt = await contract.call(
//     {
//       from: account,
//       gas: '300000',
//     },
//     methodName,
//     null
//   );
//   console.log(`call receipt: ${receipt}`);
//   return receipt;
// };

const callContract = async ({
  contractName,
  contractAddress,
  methodName,
  parameters = [],
  account = undefined,
  kaikas = false,
}: {
  contractName: string;
  contractAddress: string;
  methodName: string;
  parameters?: Array<string | number>;
  kaikas?: boolean;
  account?: string | undefined;
}) => {
  try {
    // if (
    //   contractName === undefined ||
    //   contractAddress === undefined ||
    //   methodName === undefined
    // )
    //   throw 'Not enough arguments';
    let contract = undefined;
    // if (kaikas === true && window.klaytn !== undefined) {
    if (kaikas === true) {
      contract = new caver.klay.Contract(
        abiTable[contractName],
        contractAddress
      );
      if (parameters.length > 0) {
        const receipt = await contract.call(
          {
            from: account || window.klaytn.selectedAddress,
            gas: '300000',
          },
          methodName,
          parameters
        );
        // console.log(`call receipt: ${receipt}`);
        return receipt;
      } else {
        const receipt = await contract.call(
          {
            from: account || window.klaytn.selectedAddress,
            gas: '300000',
          },
          methodName
        );
        // console.log(`call receipt: ${receipt}`);
        return receipt;
      }
    } else {
      contract = callCaver.contract.create(
        abiTable[contractName],
        contractAddress
      );
      const callResult = await contract.call(methodName, ...parameters);
      // console.log(`Result of calling get function with key: ${callResult}`);
      return callResult;
    }
  } catch (error) {
    // console.log(error);
    return error;
  }
};

const sendContract = async ({
  contractName,
  contractAddress,
  methodName,
  parameters = [],
  amount = '0',
}: {
  contractName: string;
  contractAddress: string;
  methodName: string;
  parameters?: Array<any>;
  amount?: string;
}) => {
  try {
    // if (
    //   contractName === undefined ||
    //   contractAddress === undefined ||
    //   methodName === undefined
    // )
    //   throw 'Not enough arguments';
    const myContract = new caver.klay.Contract(
      abiTable[contractName],
      contractAddress
    );
    const result = await myContract.methods[methodName](...parameters).send({
      from: window.klaytn.selectedAddress,
      to: contractAddress,
      gas: 300000,
      value: caver.utils.convertToPeb(amount, 'KLAY'),
    });
    return result?.blockHash;
  } catch (error) {
    // console.log(error);
    return error;
  }
};

const getBalance = async ({ address }: { address: string }) => {
  try {
    const balance = await callCaver.klay.getBalance(address);
    return balance;
  } catch (error) {
    // console.log(error);
    return '';
  }
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
//   parameters: [process.env.FEE_ADDRESS, "1000000"],
// });

// multiMint();

export { callContract, sendContract, getBalance, callIsApproved, sendApprove };
