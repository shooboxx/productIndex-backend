import { Product } from './productType'
import AppError from '../../utils/appError.js'
import { ProductRepo } from './productRepo'

const getBusinessProducts = async (businessId : number, page : number, pageSize : number) : Promise<Product[]> => {
    try {
        return await ProductRepo.findBusinessProducts(businessId, page, pageSize)
    }
    catch (e : any) {
        throw AppError(e.message, e.statusCode)
    }
}

const getProducts = async (productId : number) : Promise<Product> => {
    try {
        return await ProductRepo.findProducts(productId)
    }
    catch (e: any) {
        throw AppError(e.message, e.statusCode)
    }
} 

export const ProductService = {
    getBusinessProducts,
    getProducts
}