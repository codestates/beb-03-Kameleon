import WebSocket from "ws";
let ws = new WebSocket("wss://pubwss.bithumb.com/pub/ws");
ws.binaryType = "arraybuffer";

ws.onopen = () => {
  const request = [{ ticket: "ticker" }, { type: "BTC_KRW", tickTypes: "MID" }];
  ws.send(JSON.stringify(request));
};

ws.onmessage = (e) => {
  const enc = new TextDecoder("utf-8");
  const arr = new Uint8Array(e.data);
  console.log(enc.decode(arr));
};

ws.onclose = () => {
  console.log("trade closing");
};

// return () => {
//   ws.close();
// };
