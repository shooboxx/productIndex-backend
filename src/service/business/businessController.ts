const businessService = require('./businessService')
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
            profilePictureURL: req.body.profile_picture_url,
            category: req.body.business_category,
            active: true,
            insertDate: Date.now()
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