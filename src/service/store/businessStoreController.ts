export {};

const express = require("express");
const router = express.Router();
import { StoreService } from "./businessStoreService";
const businessStoreService = require("../store/businessStoreService");


router.get("/stores", async (req, res) => {
  try {
      const {storeId, storeName} = req.query
      if (storeId) return res.status(200).json(await StoreService.getStore(storeId, ''))
      if (storeName) return res.status(200).json(await StoreService.getStore(0, storeName))
      return res.status(400).json({})
  } catch (e : any) {
      res.status(e.statusCode || 400).json({error: e.message})
  }
})

module.exports = router;
