import express from "express";
const router = express.Router();
const searchService = require("./searchService");

router.get("/search/:searchCriteria", async (req: any, res: any) => {
    try {
      return res
        .status(200)
        .json(await searchService.businessFuzzySearch(req.params.searchCriteria));
    } catch (e) {
      throw e;
    }
  });

router.get("/search/product/:searchCriteria/:product_type", async (req: any, res: any) => {
    try {
      return res
        .status(200)
        .json(await searchService.productFuzzySearch(req.params.searchCriteria, req.params.product_type));
    } catch (e) {
      throw e;
    }
  });

module.exports = router;
