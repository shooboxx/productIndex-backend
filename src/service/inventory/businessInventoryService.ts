import { InventoryItem } from './businessInventoryType';
import { InventoryErrors } from './inventoryConts';
import AppError from '../../utils/appError.js'
import { StoreErrors } from 'service/store/storeConst';

import { InventoryRepo } from './businessInventoryRepo';

const getAllStoreItems = async (storeId : number) : Promise<InventoryItem[]> =>  {
    try {
        if (!storeId) throw new AppError(StoreErrors.StoreIdRequired, 400)
        const items = await InventoryRepo.findStoreInventoryItems(storeId)
        if (!items) throw new AppError(InventoryErrors.StoreInventoryItemsNotFound, 404) 
        return items
    }
    catch (e : any) {
        throw new AppError(e.message, e.statusCode || 400)
    }

};

const getInventoryItemById = async (itemId : number) : Promise<InventoryItem> =>  {
    try {
        if (!itemId) throw new AppError(InventoryErrors.InventoryIdRequired)
        const item : InventoryItem = await InventoryRepo.findInventoryItem(itemId)
        if (!item) throw new AppError(InventoryErrors.InventoryItemNotFound, 404) 
        return item
    }
    catch (e : any) {
        throw new AppError(e.message, e.statusCode || 400)
    }

};

export const InventoryService = {
    getAllStoreItems,
    getInventoryItemById
}