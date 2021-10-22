import {BusinessStore} from './storeTypes'
import { Business } from '../business/businessType';

let stores : BusinessStore[]= []

const findStoreByBusinessId = (businessId : number) : BusinessStore[] => {
    let businessStores : BusinessStore[]= []
    for (let i = 0; i < stores.length; i++) {
        if (stores[i].business_id === businessId) {
            businessStores.push(stores[i])
        }
    }
    return businessStores
}

const findStoreById = (storeId : number) : BusinessStore => {
    let businessStores : BusinessStore[]= []
    for (let i = 0; i < stores.length; i++) {
        if (stores[i].id === storeId) {
            return stores[i]
        }
    }
    return businessStores as any
}

const createBusinessStore = (store) : BusinessStore => {
    stores.push(store)
    return stores[stores.length-1]
} 

const updateStore = (store) : BusinessStore => {
    for (let i = 0; i < stores.length; i++) {
        if (stores[i].id === store.id) {
            stores[i] = store
            return stores[i]
        }
    }
    return {} as any
}

const deleteStore = (storeId) : BusinessStore => {

    stores = stores.filter(foundStore => foundStore.id != storeId)
    
    return {} as any
}
module.exports = {findStoreByBusinessId, findStoreById, createBusinessStore, updateStore, deleteStore}