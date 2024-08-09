import { D3 } from "./D3SDK.js";

const TOM_PC = "192.168.0.18";
const LOCAL = "127.0.0.1";
const D3_PORT = 7401;
const d3 = new D3({
  targetServer: TOM_PC,
  targetPort: D3_PORT,
});

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
await delay(1000);
const res = await d3.systems.getAll();
console.log(res);
const res2 = await d3.showControl.getActiveTransports();
console.log(res2);

// await delay(1000);
// d3.play();
// await delay(1000);
// d3.loopSection();
// await delay(1000);
// d3.playToEndOfSection();
// await delay(1000);
// d3.setCue("10");

// setTimeout(() => {
//   d3.setCue("1.09");
// }, 1000);

process.on("SIGINT", () => {
  // oscClient.close();
  process.exit();
});
// oscClient.close();
