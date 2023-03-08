import express from "express";
import * as crawl from "./crawl.js";

const app = express();

app.set("port", process.env.PORT || 3000);

app.get("/", (req, res) => {
  res.send("Hello, Express");
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
  crawl.crawlStock(1145380, "L");
});
