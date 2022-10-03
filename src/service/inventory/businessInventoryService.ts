import { InventoryItem } from './businessInventoryType';
import { InventoryErrors } from './inventoryConts';
import AppError from '../../utils/appError.js'
import { StoreErrors } from '../store/storeConst';

import { InventoryRepo } from './businessInventoryRepo';

const getAllStoreItems = async (storeId : number, page : number, pageSize : number) : Promise<InventoryItem[]> =>  {
    try {
        if (!storeId) throw new AppError(StoreErrors.StoreIdRequired, 400)
        return await InventoryRepo.findStoreInventoryItems(storeId, page, pageSize)
    }
    catch (e : any) {
        throw new AppError(e.message, e.statusCode)
    }

};

const getInventoryItemById = async (itemId : number) : Promise<InventoryItem> =>  {
    try {
        if (!itemId) throw new AppError(InventoryErrors.InventoryIdRequired)
        return await InventoryRepo.findInventoryItem(itemId)
    }
    catch (e : any) {
        throw new AppError(e.message, e.statusCode)
    }

};

export const InventoryService = {
    getAllStoreItems,
    getInventoryItemById
}