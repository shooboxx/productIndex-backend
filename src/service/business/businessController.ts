const express = require('express');
const businessService = require('./businessService')
const router = express.Router();

import { Business } from './businessType';

router.get('/business/:businessId', async (req: any, res: any) => {
    try {
        return res.status(200).json(businessService.getBusinessById(req.params.businessId))
    }
    catch (e) {
        throw e
    }
})

router.post('/business', async (req: any, res: any) => {
    try {
        const biz : Business= {
            name: req.body.business_name,
            description: req.body.business_description,
            profile_picture_url: req.body.profile_picture_url,
            category: req.body.business_category,
            active: true,
            insert_date: Date.now()
        }
        return res.status(200).json(businessService.createBusiness(req.userId, biz))
    }
    catch (e) {
        throw e
    }
})
router.delete('/business/:businessId', async (req: any, res: any) => {
    try {
        return res.status(200).json(businessService.deleteBusiness(req.userId, req.params.businessId))
    }
    catch (e) {
        throw e
    }
})

router.put('/business/:businessId', async (req: any, res: any) => {
    if (req.query.active) {
        const business = businessService.setBusinessActiveStatus(req.user.id, req.params.businessId, req.query.active)
        return res.status(200).json({business})
    }
    else { 
        const updatedBiz = {}
        const business = businessService.updateBusiness(req.user.id, req.params.businessId, updatedBiz)
        return res.status(200).json({business})
    }
})

module.exports = router