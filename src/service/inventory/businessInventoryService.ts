import { BusinessItem, InventoryItem } from './businessInventoryType';

const inventoryRepo = require('./businessInventoryRepo')
const storeService = require('../store/businessStoreService')

const getBusinessItems = (bId : number) : BusinessItem[] => {
    // not yet implemented
    return {} as BusinessItem[]
}
const getBusinessItemById = (bItemId : number) : BusinessItem => {
    // not yet implemented
    return {} as BusinessItem
}
const updateBusinessItem = (bItem : number) : BusinessItem => {
    // not yet implemented
    return {} as BusinessItem
}
const createBusinessItem = (bItem : number) : BusinessItem => {
    // not yet implemented
    return {} as BusinessItem
}
const deleteBusinessItem = (bItemId : number) => {
    // not yet implemented
    return {} as BusinessItem
}


const getAllStoreItems = async (storeId : number) =>  {
    try {
        storeService.getStoreById(storeId)
        const items : InventoryItem[] = inventoryRepo.findAllStoreItems(storeId)
        if (!items) throw new Error('No items found for this store') 
        return items
    }
    catch (e) {
        throw e
    }

};

const getInventoryItemById = (itemId : number) : InventoryItem =>  {
    try {
        const item : InventoryItem = inventoryRepo.findInventoryItemById(itemId)
        if (!item) throw new Error('No item found with that id') 
        return item
    }
    catch (e) {
        throw e
    }

};

const updateInventoryItem = (item : InventoryItem) : InventoryItem => {
    try {
        const currItem : InventoryItem = getInventoryItemById(item.id)

        currItem.store_id = item.store_id || currItem.store_id
        currItem.price = item.price || currItem.price
        currItem.quantity = item.quantity || currItem.quantity
        currItem.update_date = item.update_date || currItem.quantity
        
        return inventoryRepo.updateInventoryItem(currItem)
    }
    catch (e) {
        throw e
    }
};

const createInventoryItem = (item : InventoryItem) : InventoryItem => {
    try {
        const bizItem = getBusinessItemById(item.item.id)
        
        if (bizItem) {
            throw new Error('Item already exist in inventory')
        }
    }
    catch {
        return inventoryRepo.addInventoryItem(item)
    }
    return {} as InventoryItem
};

const deleteInventoryItem = (itemId : number) => {
    try {
        const exist = getInventoryItemById(itemId)

        if (exist) {
            return inventoryRepo.deleteInventoryItem(itemId)
        }
    }
    catch (e) {
        throw e
    }
};

module.exports = { getAllStoreItems, getInventoryItemById, updateInventoryItem, createInventoryItem, deleteInventoryItem }