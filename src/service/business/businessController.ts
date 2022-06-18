import express from "express";
const router = express.Router();
import { BusinessService } from './businessService';

router.get("/business/:businessId", async (req: any, res: any) => {
  try {
    return res
      .status(200)
      .json(await BusinessService.getBusinessById(req.params.businessId));
  } catch (e) {
    throw e;
  }
});

module.exports = router;
