import express from "express";
import * as crawl from "./crawl.js";
import { config } from "./config.js";
import itemRouter from "./router/item.js";

const app = express();
app.use(express.json());
const port = config.host.port;

app.get("/", async (req, res) => {
  res.send("Hello, Express");
});

app.use("/items", itemRouter);

app.listen(port, () => {
  console.log(port, "번 포트에서 대기 중");
  crawl.crawlStock();
});
