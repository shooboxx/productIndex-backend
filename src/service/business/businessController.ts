import express from "express";
const router = express.Router();
const businessService = require("./businessService");
const reviewService = require("../reviews/reviewService");
const { authenticateToken } = require("../auth/user/userAuthorization.ts");
import { Business } from "./businessType";
import { BusinessStore } from "../store/storeTypes";
const businessStoreService = require("../store/businessStoreService");

router.get("/business/:businessId", async (req: any, res: any) => {
  try {
    return res
      .status(200)
      .json(await businessService.getBusinessById(req.params.businessId));
  } catch (e) {
    throw e;
  }
});

router.post("/business", authenticateToken, async (req: any, res: any) => {
  try {
    const biz: Business = {
      name: req.body.business_name,
      description: req.body.business_description,
      profile_picture_url: req.body.profile_picture_url,
      category: req.body.business_category,
      active: true,
      created_by: req.user_id,
    };
    const createdBiz = await businessService.createBusiness(biz);
    return res.status(200).json(createdBiz);
  } catch (e) {
    throw e;
  }
});

router.delete(
  "/business/:businessId",
  authenticateToken,
  async (req: any, res: any) => {
    try {
      return res
        .status(200)
        .json(
          businessService.deleteBusiness(req.user_id, req.params.businessId)
        );
    } catch (e) {
      throw e;
    }
  }
);

// TODO: Work on update business
router.put(
  "/business/:businessId",
  authenticateToken,
  async (req: any, res: any) => {
    if (req.query.active) {
      const business = businessService.setBusinessActiveStatus(
        req.user_id,
        req.params.businessId,
        req.query.active
      );
      return res.status(200).json({ business });
    } else {
      const updatedBiz: Business = {
        name: req.params.name,
        category: req.params.category,
        created_by: req.user_id,
      };
      const business = businessService.updateBusiness(
        req.user_id,
        req.params.businessId,
        updatedBiz
      );
      return res.status(200).json({ business });
    }
  }
);

// OTHER SERVICES

//Get stores for business
router.get("/business/:businessId/stores", (req, res) => {
  try {
    const businessId = req.params.businessId;
    const stores: BusinessStore[] =
      businessStoreService.getStoresByBusinessId(businessId);

    res.status(200).json({ stores });
  } catch (e: any) {
    res.status(200).json({ error: e.message });
  }
});

// Get reviews for business
router.get("/business/:businessId/reviews", (req, res) => {
  try {
    const bizId = req.params.businessId;
    return res.status(200).json(reviewService.getReviewsByBusinessId(bizId));
  } catch (e: any) {
    res.status(200).json({ error: e.message });
  }
});

module.exports = router;
