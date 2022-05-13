const winax = require("winax");
const objCpCybos = new winax.Object("CpUtil.CpCybos.1", {
  activate: true,
});
const connectState = objCpCybos.IsConnect;
if (connectState === 0) {
  console.log("연결 안됨");
} else {
  console.log("연결 됨");
}

const objStockMst = new winax.Object("Dscbo1.StockMst", {
  activate: true,
});

const _setStockCode = async (stockCode) => {
  await objStockMst.SetInputValue(0, stockCode);
};
const _blockRequest = async () => {
  await objStockMst.BlockRequest();
};

const _getStockDataFromCode = async () => {
  const stockObj = {
    code: objStockMst.GetHeaderValue(0), // 종목코드
    name: objStockMst.GetHeaderValue(1), // 종목명
    time: objStockMst.GetHeaderValue(4), // 시간
    cprice: objStockMst.GetHeaderValue(11), // 종가
    diff: objStockMst.GetHeaderValue(12), // 대비
    open: objStockMst.GetHeaderValue(13), // 시가
    high: objStockMst.GetHeaderValue(14), // 고가
    low: objStockMst.GetHeaderValue(15), // 저가
    offer: objStockMst.GetHeaderValue(16), // 매도호가
    bid: objStockMst.GetHeaderValue(17), // 매수호가
    vol: objStockMst.GetHeaderValue(18), // 거래량
    vol_value: objStockMst.GetHeaderValue(19), // 거래대금
  };
  return stockObj;
};

const getDataFromStockCode = async (stockCode: string) => {
  await _setStockCode(stockCode);
  await _blockRequest();
  const res = await _getStockDataFromCode();
  return res;
};

// const test = async () => {
//   try {
//     const res = await getDataFromStockCode("A005930");
//     console.log(res);
//   } catch (error) {
//     console.log(error);
//   }
// };
// test();

export { getDataFromStockCode };
