import express from "express";
import * as crawl from "./crawl.js";
import { config } from "./config.js";

const app = express();
const port = config.host.port;

app.get("/", async (req, res) => {
  res.send("Hello, Express");
});

app.listen(port, () => {
  console.log(port, "번 포트에서 대기 중");
  crawl.crawlStock(1145380, "L");
});
