import fs from "fs";
import path from "path";

const contractPath = "./../../contract/artifacts";

const abiList = {};
const byteCodeList = {};
fs.readdirSync(path.join(__dirname, contractPath))
  .filter((file: String) => {
    return (
      file.indexOf(".") !== 0 &&
      file.slice(-14) !== "_metadata.json" &&
      file.slice(-5) === ".json"
    );
  })
  .forEach((file) => {
    const artifact = require(path.join(__dirname, contractPath, file));
    const abiName = file.slice(0, -5);
    abiList[abiName] = artifact?.abi as Array<Object>;
    byteCodeList[abiName] = artifact?.data?.bytecode?.object as String;
  });
export { abiList, byteCodeList };
