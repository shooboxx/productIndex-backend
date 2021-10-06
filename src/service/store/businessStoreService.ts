const businessService = require('../business/businessService')
const businessStoreRepo = require('../store/businessStoreRepo')
import { BusinessStore } from './storeTypes'

const getStoresByBusinessId = (businessId : number) : BusinessStore[] => {
   try {
        const business = businessService.getBusinessById(businessId)
        const stores =  businessStoreRepo.findStoreByBusinessId(business.id)
        if (stores.length == 0) throw new Error('No stores found for this business')
        return stores
   } 
   catch (e) {
        throw e
   }
}

const getStoreById = (storeId : number) : BusinessStore => {
   try {
       if (!storeId) throw new Error('Store id is required')
        return businessStoreRepo.findStoreById(storeId)
   } 
   catch (e) {
        throw e
   }
}
const createBusinessStore = (store : BusinessStore, businessId : number) : BusinessStore => {
    try {
        const stores = getStoresByBusinessId(businessId)
        businessService.getBusinessById(businessId)

        for (let i = 0; i< stores.length; i++ ) {
            if (store.unique_name.trim().toLowerCase() === stores[i].unique_name.trim().toLowerCase() ) {
                throw new Error('A store with that name aleady exist for your business')
            }
        }
        if (!store.unique_name) throw new Error('unique name is required')
        return businessStoreRepo.createBusinessStore(store)
    }
    catch (e) {
        throw e
    }
}


const updateStore = (store : BusinessStore) : BusinessStore => {
   try {
    const currStore = getStoreById(store.id || 0)
    const updatedStore : BusinessStore = {
        business_id: currStore.business_id,
        unique_name: store.unique_name || currStore.unique_name,
        email_address: store.email_address || currStore.email_address,
        store_hours: store.store_hours || currStore.store_hours,
        phone_1: store.phone_1 || currStore.phone_1,
        phone_2: store.phone_2 || currStore.phone_2,
        phone_3: store.phone_3 || currStore.phone_3,
        address_line_1: store.address_line_1 || currStore.address_line_1,
        address_line_2: store.address_line_2 || currStore.address_line_2,
        country: store.country || currStore.country,
        city: store.city || currStore.city,
        postal_code: store.postal_code || currStore.postal_code,
        is_primary: store.is_primary || currStore.is_primary,
        temp_or_perm_closure: store.temp_or_perm_closure || currStore.temp_or_perm_closure,
        reopen_date: store.reopen_date || currStore.reopen_date
    }
    return businessStoreRepo.updateStore(updatedStore)

   } 
   catch (e) {
        throw e
   }
}
const deleteStore = (storeId : number) : BusinessStore => {
   try {
    const store = getStoreById(storeId)
    return businessStoreRepo.removeStore(store.id)

   } 
   catch (e) {
        throw e
   }
}


module.exports = {getStoresByBusinessId, getStoreById, createBusinessStore, updateStore, deleteStore}