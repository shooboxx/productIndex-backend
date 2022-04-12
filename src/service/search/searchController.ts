import express from "express";
const router = express.Router();
const searchService = require("./searchService");

router.get("/search/:businessName", async (req: any, res: any) => {
    try {
      return res
        .status(200)
        .json(await searchService.businessFuzzySearch(req.params.businessName));
    } catch (e) {
      throw e;
    }
  });

module.exports = router;
