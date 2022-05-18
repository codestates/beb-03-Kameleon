import WebSocket from "ws";
import axios from "axios";

let ws = new WebSocket("wss://pubwss.bithumb.com/pub/ws");

const getFirstTicker = async () => {
  const firstTicker = await axios.get(
    "https://api.bithumb.com/public/ticker/KLAY_KRW"
  );
  // console.log(firstTicker.data.data.closing_price);
  return firstTicker?.data?.data?.closing_price;
};

let klaytnPrice = undefined;
ws.on("open", () => {
  const request = {
    type: "ticker",
    symbols: ["KLAY_KRW"],
    tickTypes: ["30M"],
  };
  ws.send(JSON.stringify(request));
  console.log("보냄");
});

ws.on("message", (e: { data: Iterable<number> }) => {
  const data = JSON.parse(e.toString());
  klaytnPrice = data?.content?.closePrice;
  console.log("받음", klaytnPrice);
});
export { getFirstTicker, klaytnPrice };
