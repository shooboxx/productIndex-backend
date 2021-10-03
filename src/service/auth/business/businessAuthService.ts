// functionality to see if the particular user can access a business page. Uses the user id, role id and business id
import { BusinessRole, UserBusinessRole } from './businessRoleType';
import { Business } from '../../business/businessType';

const userService = require('../../user/userService')
const businessService= require('../../business/businessService')
const businessAuthRepo = require('../business/businessAuthRepo')

function isPermitted(permission) {
    return function (req, res, next) {
        const userRole = getUserBusinessRole(req.userId, req.params.businessId)
        if (userRole.business_role.permissions[permission]) {
            next()
        }
        return res.sendStatus(403)
    }
}


const getUserBusinessRole = (userId : number, businessId : number) : UserBusinessRole => {
    try {
        userService.getUserById(userId)
        businessService.getBusinessById(businessId)
        return businessAuthRepo.findUserBusinessRole(userId, businessId)
    }
    catch (e) {
        throw e
    }

}
// Does not return the Owner role
const getBusinessRoles = (businessId : number) : BusinessRole[] => {
    try {
        businessService.getBusinessById(businessId)
        return businessAuthRepo.findBusinessRoles(businessId)
    }
    catch (e) {
        throw e
    }
    
}
// Does not return owner role
const getBusinessRoleByKey = (businessId : number, key: string) : BusinessRole => {
    try {
        businessService.getBusinessById(businessId)
        if (!key) throw Error('Key is required')
        return businessAuthRepo.findBusinessRoleByKey(businessId, key)
    }
    catch (e) {
        throw e
    }
}

// Cannot create owner role
const createBusinessRole = (businessId : number, role : BusinessRole) : BusinessRole => {
    try {
        businessService.getBusinessById(businessId)
        if (!role) throw ('Cannot create empty role')
        if (!role.name) throw Error('Role name required')
        if (!role.permissions) throw Error('Role permissions required')
        
        const bizRoles = getBusinessRoles(businessId)
        for (let i = 0; i <= bizRoles.length; i++) {
            if (role.key === bizRoles[i].key) {
                throw Error('Role with that name already exist')
            }
        }

        const newRole : BusinessRole = {
            business_id: businessId,
            key: role.name.trim().toUpperCase(),
            name: role.name,
            permissions: role.permissions,
            insert_date: Date.now(),
        }
        return businessAuthRepo.createBusinessRole(businessId, newRole)
        
    }
    catch (e) {
        throw e
    }
}

// Cannot update owner role
const updateBusinessRole = (role) : BusinessRole => {
    businessService.getBusinessById(role.businessId)
    const bizRoles = getBusinessRoles(role.businessId)
    for (let i = 0; i <= bizRoles.length; i++) {
        if (bizRoles[i].id == role.id) {
            const updatedRole : BusinessRole = {
                id: bizRoles[i].id,
                business_id: bizRoles[i].business_id,
                key: role.name.trim().toUpperCase() || bizRoles[i].key,
                name: role.name || bizRoles[i].name,
                permissions: role.permissions || bizRoles[i].permissions,
                insert_date: bizRoles[i].insert_date,
                update_date: Date.now()
            }
            return businessAuthRepo.updateBusinessRole(updatedRole)
        }
    }
    throw Error('Role not found')
}

const deleteBusinessRoleByKey = (businessId : number, key : string) => {

}

const createRoleForBusiness = () => {

}

const addBusinessRoleToUser = (userId : number, businessRoleId : number) : UserBusinessRole => {
    try {
        if (!businessRoleId) throw Error('businessRoleId is required')
        userService.getUserById(userId)
        return businessAuthRepo.createUserBusinessRole(userId, businessRoleId)
    }
    catch (e) {
        throw e
    }

}

module.exports = {isPermitted, getUserBusinessRole, getBusinessRoles, getBusinessRoleByKey, createBusinessRole, updateBusinessRole}