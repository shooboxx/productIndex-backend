import { BusinessStore } from "./storeTypes";
import { StoreRepo } from './businessStoreRepo';
import AppError from '../../utils/appError'


const getStore = async (storeId : number, storeName : string) : Promise<BusinessStore> => {
    return await StoreRepo.findStore(storeId, storeName).catch(err => {throw new AppError(err.message, 400)})
}


export const StoreService = {
    getStore
  };