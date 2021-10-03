import { Business } from "./businessType";
import { UserBusinessRole } from '../auth/business/businessRoleType';
import { BusinessErrors } from './businessErrors'

const userService = require('../user/userService');
const businessRepo = require('./businessRepo')

const getUserBusinesses = (userId : number) : UserBusinessRole[] => {
    try {
        userService.getUserById(userId)
        return businessRepo.findUserBusinesses(userId)
    }
    catch (e) {
        throw e
    }
    
}
const getBusinessById = (businessId : number) : Business => {
    if (!businessId) throw Error(BusinessErrors.BusinessIdRequired)
    try {
        const business = businessRepo.findBusiness(businessId, null)
        if (business.id == 0) {
            throw Error(BusinessErrors.NoBusinessFound)
        }
        return business
    }
    catch(e) {
        throw e
    }

}

const getBusinessMasterDetail = () => {

}

const createBusiness = (userId : number, newBusiness : Business) : UserBusinessRole => {
    try {
        const business = businessRepo.createBusiness(userId, newBusiness)
        const role = businessRepo.createBusinessRole(business.id, userId, 'OWNER')
    
        return {
            userId: userId,
            businessRole: role
        }
    }
    catch (e) {
        throw e
    }


}
const deleteBusiness = (userId : number, businessId : number) => {
    try {
        const businesses = getUserBusinesses(userId)
        for (let i = 0; i <= businesses.length; i++) {
            if (businesses[i].businessRole.businessId == businessId ) {
                return businessRepo.removeBusiness(businessId)
            }
        }
        throw Error(BusinessErrors.NoBusinessFound)

    }
    catch (e) {
        throw e
    }
    
}
const setBusinessActiveStatus = (userId : number, businessId : number, status : boolean) : Business => {
    try {
        const businesses = getUserBusinesses(userId)
        for (let i = 0; i <= businesses.length; i++) {
            if (businesses[i].businessRole.businessId== businessId ) {
                return businessRepo.setBusinessActiveStatus(businessId, status)
            }
        }
        throw Error(BusinessErrors.NoBusinessFound)
    }
    catch (e) {
        throw e
    }
        

}
const updateBusiness = (userId : number, businessId: number, updatedBusiness : Business) : Business => {
    try {
        const businesses = getUserBusinesses(userId)
        for (let i = 0; i <= businesses.length; i++) {
            if (businesses[i].businessRole.businessId == businessId ) {
                return businessRepo.updateBusiness(businessId, updatedBusiness)
            }
        }
        throw Error(BusinessErrors.NoBusinessFound)
    }
    catch (e) {
        throw e
    }

}

const isBusinessActive = (businessId : number) : Boolean => {
    try {
        const business = getBusinessById(businessId)
        return business.active
    }
    catch (e) {
        throw e
    }

}

module.exports = {getBusinessById, getUserBusinesses, createBusiness, deleteBusiness, setBusinessActiveStatus, updateBusiness, isBusinessActive}