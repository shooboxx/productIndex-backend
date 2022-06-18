import { BusinessStore } from "./storeTypes";
import { StoreRepo } from './businessStoreRepo';


const getStore = async (storeId : number, storeName : string) : Promise<BusinessStore> => {
    return await StoreRepo.findStore(storeId, storeName)
}


export const StoreService = {
    getStore
  };