import express from "express";
import dotenv from "dotenv";
import * as crawl from "./crawl.js";

const app = express();

dotenv.config();
const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello, Express");
});

app.listen(port, () => {
  console.log(port, "번 포트에서 대기 중");
  crawl.crawlStock(1145380, "L");
});
