import { klaytnPrice } from "./bithumbSocket";
import { stockPrice } from "./naverApi";
import { sendContract, caver } from "./KAS";
import { OracleAddress } from "../constants/contractAddress";
require("dotenv").config();

const updateStockPrice = async () => {
  const result = await stockPrice();
  console.log(result);
  if (result.length > 0 && klaytnPrice !== undefined) {
    const price = +klaytnPrice;
    await sendContract({
      contractName: "Oracle",
      contractAddress: OracleAddress,
      methodName: "setOraclePrice",
      parameters: [
        result.map(({ nowValue }) => {
          console.log(price);
          console.log(nowValue / price);
          return caver.utils.convertToPeb(
            (nowValue / price).toString(),
            "KLAY"
          );
        }),
      ],
    });
  }
};

export { updateStockPrice };
