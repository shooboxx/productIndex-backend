import { BusinessErrors } from "./businessErrors";
import { BusinessRepo } from "./businessRepo";
import AppError from '../../utils/appError.js'

const getBusinessById = async (businessId: number) => {
  try {
    if (!businessId) throw Error(BusinessErrors.BusinessIdRequired);
    
    const business = await BusinessRepo.findBusinessById(businessId);
    if (!business) {
      throw AppError(BusinessErrors.NoBusinessFound, 404);
    }
    return business;
  } 
  catch (e : any) {
    throw new AppError(e.message, e.statusCode || 400)
  }
};

export const BusinessService = {
  getBusinessById
}