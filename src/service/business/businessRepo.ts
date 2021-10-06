import { Business } from "./businessType";

const businesses : Business[] = []

const findUserBusinesses = (userId) => {
    return null
    
}

const findBusinessById = (businessId : number) : Business => {
    for (let i = 0; i <= businesses.length; i++) {
        if (businesses[i].id === businessId) {
            return businesses[i]
        }
    }
    return {
        id: 0,
        name: '',
        category: '',
        active: false,
        insert_date: 0
    }
}

const createBusiness = (newBusiness : Business) : Business => {
    newBusiness.id = Math.floor(Math.random()*100000000)
    businesses.push(newBusiness)
    return businesses[businesses.length - 1]

}
const removeBusiness = (businessId) => {
    for (let i = 0; i <= businesses.length; i++) {
        if (businesses[i].id == businessId ) {
            businesses.splice(i, 1)
            return -1
        }
    }
    return 0 
 
}

const setBusinessActiveStatus = (businessId, status) => {
    for (let i = 0; i <= businesses.length; i++) {
        if (businesses[i] == businessId ) {
            businesses[i].active = status
            return businesses[i]
        }
    }
}
const updateBusiness = (businessId, updatedBusiness : Business) => {
    for (let i = 0; i <= businesses.length; i++) {
        if (businesses[i] == businessId ) {
            return businesses[i] = updatedBusiness
        }
    }
}
const findBusinessMasterDetail = () => {

}

module.exports = {findBusinessById, findUserBusinesses, createBusiness, removeBusiness, setBusinessActiveStatus, updateBusiness}