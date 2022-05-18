import { KameleonAddress } from "../constants/contractAddress";
import { sendContract } from "./KAS";

const multiMint = () => {
    sendContract({
      contractName: "Kameleon",
      contractAddress: KameleonAddress,
      methodName: "mintToLPs",
    });
};

export { multiMint };
