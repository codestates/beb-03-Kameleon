import {
  recordBulkPoolLiquidity,
  recordPoolLiquidity,
} from "../service/contract.service";
import { IPoolLiquidity } from "../types/utilities/interfaceInterestCalculator";
import { getPoolLiquidity } from "./interestCalculator";
const checkPoolLiquidity = async () => {
  const { success, data } = await getPoolLiquidity();
  if (success && data !== null) {
    console.log(data);
    data.map(
      ({
        exchangeAddress: address,
        poolLiquidity: poolSize,
      }: IPoolLiquidity) => {
        recordPoolLiquidity({
          address,
          poolSize,
        });
      }
    );
  }
};
// bulk형
const checkBulkPoolLiquidity = async () => {
  const { success, data } = await getPoolLiquidity();
  if (success && data !== null) {
    const newData = data.map(
      ({
        exchangeAddress: address,
        poolLiquidity: poolSize,
      }: IPoolLiquidity) => ({
        address,
        poolSize,
      })
    );
    recordBulkPoolLiquidity(newData);
  }
};
export { checkPoolLiquidity, checkBulkPoolLiquidity };
