import {
  IPoolLiquidity_ReturnType,
  IPoolLiquidity,
} from "./../types/utilities/interfaceInterestCalculator";
import {
  FactoryAddress,
  kStockTokenAddress,
  exchangeToKStockTokenAddressTable,
} from "../constants/contractAddress";
import { callContract, getBalance } from "./KAS";

const getPoolLiquidity = async (): Promise<IPoolLiquidity_ReturnType> => {
  const allExchangeList = await callContract({
    contractName: "Factory",
    contractAddress: FactoryAddress,
    methodName: "getAllExchangeList",
  });
  console.log(allExchangeList);
  if (allExchangeList.length > 0) {
    const result: Array<IPoolLiquidity> = await Promise.all(
      allExchangeList.map(async (exchangeAddress: string) => {
        const res1 = await callContract({
          contractName: "KStockToken",
          contractAddress: exchangeToKStockTokenAddressTable[exchangeAddress],
          methodName: "balanceOf",
          parameters: [exchangeAddress],
        });
        console.log("checkPoolLiquidity res1", res1);
        const totalSupply = await callContract({
          contractName: "Exchange",
          contractAddress: exchangeAddress,
          methodName: "totalSupply",
        });
        console.log("checkPoolLiquidity totalSupply", totalSupply);
        const exchangeBalance = await getBalance({ address: exchangeAddress });
        const calcResult = +res1 + +exchangeBalance / +totalSupply || 0;
        return { exchangeAddress, poolLiquidity: calcResult, totalSupply };
      })
    );
    return { success: true, data: result };
  } else {
    return { success: false, data: [] };
  }
};
export { getPoolLiquidity };
