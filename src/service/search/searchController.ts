import express from "express";
const router = express.Router();
const searchService = require("./searchService");

router.get("/search", async (req: any, res: any) => {
  const {type, location, search } = req.query
    try {
      if (type == 'BUSINESS') {
        return res
        .status(200)
        .json(await searchService.businessFuzzySearch(search,location));
      }
      if (type == 'PRODUCT' || type == 'SERVICE') {
      return res
        .status(200)
        .json(await searchService.productFuzzySearch(search, type, location));
      }
    } catch (e) {
      throw e;
    }
  });

module.exports = router;
