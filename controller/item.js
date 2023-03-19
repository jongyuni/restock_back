import * as itemRepository from "../data/item.js";

export async function getItems(req, res) {
  const data = await itemRepository.getItems();

  res.status(200).json(data);
}

export async function enrollItem(req, res) {
  const itemNo = req.body.itemNo;
  const size = req.body.size;

  const data = await itemRepository.enrollItem(itemNo, size);

  if (data) {
    res.status(201).json(data);
  } else {
    res.status(409).json({ message: "Fail" });
  }
}

export async function deleteItem(req, res) {
  const itemNo = req.query.itemNo;

  const result = await itemRepository.deleteItem(itemNo);

  if (result[0]) {
    res.sendStatus(204);
  } else {
    res.status(404).json({ message: "there isn't such item " });
  }
}
