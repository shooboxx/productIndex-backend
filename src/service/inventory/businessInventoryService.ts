import { InventoryItem } from './businessInventoryType';
import { InventoryErrors } from './inventoryConts';
import AppError from '../../utils/appError.js'
import { StoreErrors } from '../store/storeConst';

import { InventoryRepo } from './businessInventoryRepo';

const getAllStoreItems = async (storeId : number) : Promise<InventoryItem[]> =>  {
    try {
        if (!storeId) throw new AppError(StoreErrors.StoreIdRequired, 400)
        return await InventoryRepo.findStoreInventoryItems(storeId)
    }
    catch (e : any) {
        throw new AppError(e.message, e.statusCode || 400)
    }

};

const getInventoryItemById = async (itemId : number) : Promise<InventoryItem> =>  {
    try {
        if (!itemId) throw new AppError(InventoryErrors.InventoryIdRequired)
        return await InventoryRepo.findInventoryItem(itemId)
    }
    catch (e : any) {
        throw new AppError(e.message, e.statusCode || 400)
    }

};

export const InventoryService = {
    getAllStoreItems,
    getInventoryItemById
}