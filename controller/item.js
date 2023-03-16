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
