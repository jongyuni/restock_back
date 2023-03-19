import { db } from "../db/database.js";

export async function getItems() {
  return db
    .execute("SELECT itemNo, size FROM musinsa;")
    .then((result) => result[0]);
}

export async function enrollItem(itemNo, size) {
  return db
    .execute("INSERT INTO musinsa (itemNo, size) VALUES (?, ?);", [
      itemNo,
      size,
    ])
    .then((result) => getItems())
    .catch(function (err) {});
}

export async function deleteItem(itemNo) {
  return db
    .execute("DELETE FROM musinsa WHERE itemNo = ?;", [itemNo])
    .then((result) => result[0]);
}
