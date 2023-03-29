import express from "express";
import "express-async-errors";
import * as itemController from "../controller/item.js";

const router = express.Router();

router.get("/", itemController.getItems);

router.post("/new", itemController.enrollItem);

router.delete("/delete", itemController.deleteItem);

export default router;
