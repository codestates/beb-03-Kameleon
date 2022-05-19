import Exchange from './../contracts/artifacts/Exchange.json';
import Factory from './../contracts/artifacts/Factory.json';
import Kameleon from './../contracts/artifacts/Kameleon.json';
import KStockToken from './../contracts/artifacts/KStockToken.json';
import Oracle from './../contracts/artifacts/Oracle.json';
import Govern from './../contracts/artifacts/Govern.json';

interface abiType {
  [key: string]: Array<any>;
}

interface byteCodeType {
  [key: string]: string;
}

export const abiTable: abiType = {
  Exchange: Exchange?.abi,
  Factory: Factory?.abi,
  Kameleon: Kameleon?.abi,
  KStockToken: KStockToken?.abi,
  Oracle: Oracle?.abi,
  Govern: Govern?.abi,
};

export const byteCodeTable: byteCodeType = {
  Exchange: Exchange?.data?.bytecode?.object,
  Factory: Factory?.data?.bytecode?.object,
  Kameleon: Kameleon?.data?.bytecode?.object,
  KStockToken: KStockToken?.data?.bytecode?.object,
  Oracle: Oracle?.data?.bytecode?.object,
  Govern: Govern?.data?.bytecode?.object,
};

export const contractAddressTable = {
  Oracle: '0xDD776448ded1cAc2108817bAe89fDc72c24474f1',
  Factory: '0xbD171B0509B88EF736Ab03865934cD900e1197a5',
  Kameleon: '0x48b19619273A96FFf8735a60D9A19924a5016E39',
  Govern: '0x8ff0B86c395b36Ac96E56E8248DCB6ae74201A2F',
};

export const exchangeAddressTable: { [x: string]: string } = {
  kSSE: '0x5456540aabd10eb07b92af271072027f1f72b3dc',
  kLGE: '0x1478992b8d4ad729a1ed7b4f35ffbec328e4d671',
  kKKO: '0xcfa5a64b0cfa4b6aebac02a9c2d67723bccdf393',
  kSSB: '0xe70cf58c6d8f23a75c608b9b95b8176b74faf1e8',
  kSSH: '0xbf02f6f1a75d2bdc2e2619b49a3e116e5e90e219',
};

export const kStockTokenAddressTable: { [x: string]: string } = {
  kSSE: '0x58791638902535f1Cfc0004453B0A09bFC50B7bE',
  kLGE: '0x6727F8C740f5f3d3b58fc681fE32d3b9eC1D31Df',
  kKKO: '0x139B29164a11FD2AFBF772A761aC31B742C4C735',
  kSSB: '0x2DE466829ac31Db937946365A9f8Aec86363120F',
  kSSH: '0xE90E363fD3FfdB1Aa8577c71EbBABd00d8c7aBea',
};
