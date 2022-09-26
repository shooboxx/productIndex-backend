import { Product } from './productType'
import AppError from '../../utils/appError.js'
import { ProductRepo } from './productRepo'

const getBusinessProducts = async (businessId : number) : Promise<Product[]> => {
    try {
        return await ProductRepo.findBusinessProducts(businessId)
    }
    catch (e : any) {
        throw AppError(e.message, e.statusCode)
    }
}

const getProducts = async (productId : number, productKey : string) : Promise<Product> => {
    try {
        return await ProductRepo.findProducts(productId, productKey)
    }
    catch (e: any) {
        throw AppError(e.message, e.statusCode)
    }
} 

export const ProductService = {
    getBusinessProducts,
    getProducts
}