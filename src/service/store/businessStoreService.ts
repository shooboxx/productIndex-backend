import { BusinessStore } from "./storeTypes";
import { StoreRepo } from './businessStoreRepo';
import AppError from '../../utils/appError'
import { StoreErrors } from "./storeConst";
import { UserErrors } from "../user/userConst";


const getStore = async (storeId : number, storeName : string) : Promise<BusinessStore> => {
    return await StoreRepo.findStore(storeId, storeName).catch(err => {throw new AppError(err.message, 400)})
}

const reportStore = async (userId : number, storeId : number, reason : string) => {
    if (!userId) throw new AppError(UserErrors.UserIdRequired, 400) 
    if (!storeId) throw new AppError(StoreErrors.StoreIdRequired, 400)  
    if (!reason) throw new AppError(StoreErrors.ReportedReasonRequired, 400)
    return await StoreRepo.reportStore(userId, storeId, reason)

}

export const StoreService = {
    getStore,
    reportStore
  };