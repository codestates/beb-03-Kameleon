import { klaytnPrice } from "./bithumbSocket";
import { stockPrice } from "./naverApi";
import { sendContract, caver } from "./KAS";
require("dotenv").config();

const updateStockPrice = async () => {
  const result = await stockPrice();
  console.log(result);
  if (result.length > 0 && klaytnPrice !== undefined) {
    const price = +klaytnPrice;
    await sendContract({
      contractName: "Oracle",
      contractAddress: process.env.Oracle_CONTRACT_ADDRESS,
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

const updateKlayPrice = async () => {
  if (klaytnPrice !== undefined) {
    const price = +klaytnPrice;
    await sendContract({
      contractName: "Oracle",
      contractAddress: process.env.Oracle_CONTRACT_ADDRESS,
      methodName: "setKlaytnPrice",
      parameters: [Math.floor(price)],
    });
  }
};

export { updateStockPrice, updateKlayPrice };
