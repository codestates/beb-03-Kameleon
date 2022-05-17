import {
  ExchangeAddress,
  FactoryAddress,
  kStockTokenAddress,
} from "../constants/contractAddress";
import { callContract, getBalance } from "./KAS";

const checkPoolLiquidity = async () => {
  const allExchangeList = await callContract({
    contractName: "Factory",
    contractAddress: FactoryAddress,
    methodName: "getAllExchangeList",
  });
  console.log(allExchangeList);
  let sumAllExchangeTotalSupply = 0;
  if (allExchangeList.length > 0) {
    const result = await Promise.all(
      allExchangeList.map(async (exchangeAddress: string) => {
        const res1 = await callContract({
          contractName: "KStockToken",
          contractAddress: kStockTokenAddress,
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
        console.log(exchangeBalance);
        const calcResult = +res1 + +exchangeBalance / totalSupply;
        sumAllExchangeTotalSupply += +totalSupply;
        return [exchangeAddress, calcResult];
      })
    );
    console.log(result, sumAllExchangeTotalSupply);
    return { result, sumAllExchangeTotalSupply };
  } else {
    return [false, 0];
  }
};
export { checkPoolLiquidity };
