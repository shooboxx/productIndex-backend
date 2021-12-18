import { BusinessStore } from './storeTypes'
import { Business } from '../business/businessType';
const sequelize = require('sequelize');

const Store = require("../../models/stores");


let stores: BusinessStore[] = []

const findStoreByBusinessId = async (businessId: number) => {

    const businessStore = await Store.findOne({ where: { business_id: businessId }, raw: true })
    if (!businessStore) {
        return
    }
    return businessStore
}

const findStoreById = async (storeId: number) => {
    const businessStore = await Store.findByPk(storeId, { raw: true })
    if (!businessStore) {
        return
    }
    return businessStore
}

const createBusinessStore = async (store: BusinessStore) => {
    const businessStore = await Store.findAll({ where: sequelize.fn('upper', sequelize.col('unique_name'), store.unique_name.trim().toLowerCase()), raw: true })

    if (businessStore) {
        return
    }

    await Store.create({ store }).catch(err => null)

    return store
}

const updateStore = async (store: BusinessStore) => {
    await Store.update({
        unique_name: store.unique_name,
        update_date: Date.now(),
    }, {
        where: {
            id: store.id
        }
    })

    return store;

}

const deleteStore = (storeId): BusinessStore => {

    stores = stores.filter(foundStore => foundStore.id != storeId)

    return {} as any
}
module.exports = { findStoreByBusinessId, findStoreById, createBusinessStore, updateStore, deleteStore }