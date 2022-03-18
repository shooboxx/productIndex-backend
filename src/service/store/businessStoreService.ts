const businessService = require('../business/businessService');
const businessStoreRepo = require('../store/businessStoreRepo');

import { BusinessStore } from './storeTypes'

const getStoresByBusinessId = async (businessId: number) => {
    try {
        const stores = await businessStoreRepo.findStoreByBusinessId(businessId)
        if (!stores) throw new Error('No stores found for this business')
        return stores
    }
    catch (e) {
        throw e
    }
}

const getStoreById = async (storeId: number) => {
    try {
        if (!storeId) throw new Error('Store id is required')
        const store = await businessStoreRepo.findStoreById(storeId)
        if (!store) throw new Error('No store found with that Id')

        return store
    }
    catch (e) {
        throw e
    }
}
const createBusinessStore = async (store: BusinessStore) => {
    try {
        businessService.getBusinessById(store.business_id)
        const stores = await businessStoreRepo.createBusinessStore(store)

        if (!stores) {
            throw new Error('A store with that name aleady exist for your business')
        }

        if (!store.unique_name) throw new Error('unique name is required')

        return stores
    }
    catch (e) {
        throw e
    }
}


const updateStore = async (store: BusinessStore) => {
    try {
        const currStore = await getStoreById(store.id || 0)
        const updatedStore: BusinessStore = {
            business_id: currStore.business_id,
            unique_name: store.unique_name || currStore.unique_name,
            inventory: store.inventory || currStore.inventory,
            email_address: store.email_address || currStore.email_address,
            business_days: store.business_days || currStore.business_days,
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
        return await businessStoreRepo.updateStore(updatedStore)

    }
    catch (e) {
        throw e
    }
}
const deleteStore = async (storeId: number) => {
    try {
        const store = await getStoreById(storeId)
        return await businessStoreRepo.removeStore(store.id)

    }
    catch (e) {
        throw e
    }
}

const getStoreDetails = async (storeId: number) => {
    try {
        const store = await businessStoreRepo.getStoreDetails(storeId)
        return store
    }
    catch (e) {
        throw e
    }
}

module.exports = { getStoresByBusinessId, getStoreById, createBusinessStore, updateStore, deleteStore,getStoreDetails }