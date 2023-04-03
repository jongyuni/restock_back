import request from "request";
import * as cheerio from "cheerio";
import * as scheduler from "node-schedule";
import * as kakaoTalk from "./kakaoTalk.js";
import * as itemRepository from "./data/item.js";

let items;

async function initItems() {
  items = await itemRepository.getItems();
}

export async function crawlStock() {
  initItems();

  const schedule = scheduler.scheduleJob("*/1 * * * *", function () {
    for (var i = 0; i < items.length; i++) {
      const size = items[i].size;
      const itemNo = items[i].itemNo;

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

        if (map.get(size) === "Y") {
          //const msg = productTitle + " " + size + " 재고있음";
          //itemRepository.deleteItem(itemNo);
          //kakaoTalk.sendMsg(msg);
          //schedule.cancel();
          //scrawlStock();
        } else {
          console.log("Not Yet");
        }
      });
    }
  });
}
