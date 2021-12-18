import { Business } from "./businessType";
import { BusinessRole, UserBusinessRole } from '../auth/business/businessRoleType';
import { BusinessErrors } from './businessErrors'

const userService = require('../user/userService');
const businessRepo = require('./businessRepo')

const getUserBusinesses = async (userId: number) => {
    try {
        await userService.getUserById(userId)
        const biz = await businessRepo.findUserBusinesses(userId)
        return biz
    }
    catch (e) {
        throw e
    }

}
const getBusinessById = async (businessId: number) => {
    if (!businessId) throw Error(BusinessErrors.BusinessIdRequired)
    try {
        const business = await businessRepo.findBusinessById(businessId)
        if (!business) {
            throw Error(BusinessErrors.NoBusinessFound)
        }
        return business
    }
    catch (e) {
        throw e
    }

}
const businessNameMatch = async (businessName: string) => {
    if (!businessName) throw Error('Business name is required')
    try {
        return await businessRepo.businessNameMatch(businessName.trim().toLocaleUpperCase())
    }
    catch (e) {
        throw e
    }
}

const createBusiness = async (newBusiness: Business) => {
    try {
        if (!newBusiness.category) throw new Error('Business category is required')
        if (!newBusiness.name) throw new Error('Business name is required')
        // do a check to see if business exists
        const business = await businessRepo.createBusiness(newBusiness)

        return business
    }
    catch (e) {
        throw e
    }

}
// const deleteBusiness = (userId : number, businessId : number) => {
//     try {
//         const businesses = getUserBusinesses(userId)
//         for (let i = 0; i <= businesses.length; i++) {
//             if (businesses[i].business_role.business_id == businessId ) {
//                 return businessRepo.removeBusiness(businessId)
//             }
//         }
//         throw Error(BusinessErrors.NoBusinessFound)

//     }
//     catch (e) {
//         throw e
//     }

// }
// const setBusinessActiveStatus = (userId : number, businessId : number, status : boolean) : Business => {
//     try {
//         const businesses = getUserBusinesses(userId)
//         for (let i = 0; i <= businesses.length; i++) {
//             if (businesses[i].business_role.business_id== businessId ) {
//                 return businessRepo.setBusinessActiveStatus(businessId, status)
//             }
//         }
//         throw Error(BusinessErrors.NoBusinessFound)
//     }
//     catch (e) {
//         throw e
//     }
// }

const updateBusiness = async (userId: number, businessId: number, updatedBusiness: Business): Promise<Business> => {
    try {
        const businesses = await getUserBusinesses(userId)
        for (let i = 0; i < businesses.length; i++) {
            if (businesses[i].id == businessId) {
                businesses[i].active = updatedBusiness.active || businesses[i].active;
                businesses[i].category = updatedBusiness.category || businesses[i].category;
                businesses[i].description = updatedBusiness.description || businesses[i].description;
                businesses[i].name = updatedBusiness.name || businesses[i].name;
                businesses[i].update_date = Date.now()

                return businessRepo.updateBusiness(businessId, updatedBusiness)
            }
        }
        throw Error(BusinessErrors.NoBusinessFound)
    }
    catch (e) {
        throw e
    }

}

// const isBusinessActive = (businessId : number) : Boolean => {
//     try {
//         const business = getBusinessById(businessId)
//         return business.active || false
//     }
//     catch (e) {
//         throw e
//     }

// }

// const getBusinessMasterDetail = () => {

// }

module.exports = { getBusinessById, getUserBusinesses, createBusiness, updateBusiness }
    // , deleteBusiness, setBusinessActiveStatus, updateBusiness, isBusinessActive}