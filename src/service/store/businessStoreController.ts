export {};

const express = require("express");
const router = express.Router();
import { StoreService } from "./businessStoreService";
const { authenticateToken } = require('../auth/user/userAuthorization')

router.get("/stores", async (req, res) => {
  try {
      const {storeId, storeName} = req.query
      if (storeId) return res.status(200).json(await StoreService.getStore(storeId, ''))
      if (storeName) return res.status(200).json(await StoreService.getStore(0, storeName))
      return res.status(400).json(null)
  } catch (e : any) {
      res.status(e.statusCode).json({error: e.message})
  }
})

router.post("/stores/:storeId/report", authenticateToken, async (req, res) => {
  try {
    await StoreService.reportStore(req.user_id, parseInt(req.params.storeId), req.body.reported_reason)
    return res.status(200).json({success: true})
  }
  catch (e: any) {
    res.status(200).json({ "error": e.message })
  }
})

module.exports = router;
