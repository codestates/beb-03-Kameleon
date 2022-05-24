import {
  recordBulkPoolLiquidity_service,
  recordPoolLiquidity_service,
} from "../service/contract.service";
import { IPoolLiquidity } from "../types/utilities/interfaceInterestCalculator";
import { getPoolLiquidity } from "./interestCalculator";
const checkPoolLiquidity = async () => {
  try {
    const { success, data } = await getPoolLiquidity();
    if (success && data !== null) {
      console.log(data);
      data.map(
        ({
          exchangeAddress: address,
          poolLiquidity: poolSize,
        }: IPoolLiquidity) => {
          recordPoolLiquidity_service({
            address,
            poolSize,
          });
        }
      );
    }
  } catch (error) {
    console.log(error);
  }
};
// bulk형
const checkBulkPoolLiquidity = async () => {
  try {
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
      recordBulkPoolLiquidity_service(newData);
    }
  } catch (error) {
    console.log(error);
  }
};

const calcPoolRoi = ({ first, last }) => {
  const firstPoolData = first;
  const lastPoolData = last;
  const firstDate = new Date(firstPoolData.createdAt).getDate;
  const lastDate = new Date(lastPoolData.createdAt).getDate;
  const ROI =
    (lastPoolData.poolSize / firstPoolData.poolSize) ^
    ((365 / (+lastDate - +firstDate) - 1) * 100);
  console.log({ address: firstPoolData.address, roi: ROI });
  return { address: firstPoolData.address, roi: ROI };
};
export { checkPoolLiquidity, checkBulkPoolLiquidity, calcPoolRoi };
