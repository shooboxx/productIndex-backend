// import { BusinessInventory } from './businessInventoryType'
import { InventoryItem } from './businessInventoryType';
import db from '../../models'

const findStoreInventoryItems = async (storeId, page, pageSize) : Promise<InventoryItem[]>=> {
    let clause = {
        where: {
            business_store_id: storeId
        },
        attributes: {
            exclude: ['insert_date', 'update_date']
        },
        include: [{model: db.Product, where: {deleted_date: null},attributes: {exclude: ['insert_date', 'update_date', 'deleted_date' ]}}]
        
    }
    if (page >= 0 && pageSize)  {
        clause['limit'] = pageSize 
        clause['offset'] = page * pageSize
    }
    return await db.InventoryItem.findAndCountAll(clause).catch(e => {throw new Error(e.message)})
}

const findInventoryItem = async (inventoryId : number) : Promise<InventoryItem> => {
    return await db.InventoryItem.findOne({
        where: {
            id: inventoryId
        },
        attributes: {
            exclude: ['insert_date', 'update_date']
        },
        include: [{model: db.Product, where: {deleted_date: null}, attributes: {exclude: ['insert_date', 'update_date', 'deleted_date' ]}}]
    }).catch(e => {throw new Error(e.message)})
}
export const InventoryRepo = {
    findInventoryItem,
    findStoreInventoryItems
}