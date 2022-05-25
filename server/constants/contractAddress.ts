require("dotenv").config();

export const OracleAddress = process.env.Oracle_CONTRACT_ADDRESS;
export const FactoryAddress = process.env.Factory_CONTRACT_ADDRESS;
export const kStockTokenAddress = process.env.KStockToken_CONTRACT_ADDRESS;
export const KameleonAddress = process.env.Kameleon_CONTRACT_ADDRESS;

export const KStockTokenTable = {
  kSSE: "0x58791638902535f1cfc0004453b0a09bfc50b7be",
  kLGE: "0x6727f8c740f5f3d3b58fc681fe32d3b9ec1d31df",
  kKKO: "0x139b29164a11fd2afbf772a761ac31b742c4c735",
  kSSB: "0x2de466829ac31db937946365a9f8aec86363120f",
  kSSH: "0xe90e363fd3ffdb1aa8577c71ebbabd00d8c7abea",
};
export const exchangeTable = {
  kSSE: "0x5456540AaBd10Eb07b92aF271072027f1f72b3dC",
  kLGE: "0x1478992B8D4aD729a1eD7b4f35FFbEC328e4d671",
  kKKO: "0xcFA5a64B0cfa4b6aEbAC02a9c2d67723bCCdF393",
  kSSB: "0xe70cf58c6D8F23A75C608b9b95B8176B74FaF1E8",
  kSSH: "0xBf02f6f1A75D2BDC2E2619B49a3e116E5e90E219",
};
export const exchangeToKStockTokenAddressTable = {
  "0x5456540AaBd10Eb07b92aF271072027f1f72b3dC":
    "0x58791638902535f1cfc0004453b0a09bfc50b7be",
  "0x1478992B8D4aD729a1eD7b4f35FFbEC328e4d671":
    "0x6727f8c740f5f3d3b58fc681fe32d3b9ec1d31df",
  "0xcFA5a64B0cfa4b6aEbAC02a9c2d67723bCCdF393":
    "0x139b29164a11fd2afbf772a761ac31b742c4c735",
  "0xe70cf58c6D8F23A75C608b9b95B8176B74FaF1E8":
    "0x2de466829ac31db937946365a9f8aec86363120f",
  "0xBf02f6f1A75D2BDC2E2619B49a3e116E5e90E219":
    "0xe90e363fd3ffdb1aa8577c71ebbabd00d8c7abea",
};
