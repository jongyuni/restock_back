import request from "request";
import * as cheerio from "cheerio";
import * as scheduler from "node-schedule";
import * as kakaoTalk from "./kakaoTalk.js";

export async function crawlStock(itemNo, size) {
  const schedule = scheduler.scheduleJob("*/1 * * * *", function () {
    let url = "https://musinsa.com/app/goods/" + itemNo;

    request(url, function (error, res, html) {
      if (error) {
        throw error;
      }

      const $ = cheerio.load(html);
      const productTitle = $(".product_title em").text();
      const option = $(".option1 option");
      let map = new Map();

      for (let i = 1; i < option.length; i++) {
        map.set(option[i].attribs.value, option[i].attribs.jaego_yn);
      }

      console.log("사이즈: " + size);
      console.log("재고: " + map.get(size));

      if (map.get(size) === "Y") {
        const msg = productTitle + " " + size + " 재고있음";
        console.log(msg);
        kakaoTalk.sendMsg(msg);
        schedule.cancel();
      } else {
        console.log("Not Yet");
      }
    });
  });
}
