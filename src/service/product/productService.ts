import { Product } from './productType'
import AppError from '../../utils/appError.js'
import { ProductRepo } from './productRepo'

const getBusinessProducts = async (businessId : number) : Promise<Product[]> => {
    try {
        return await ProductRepo.findBusinessProducts(businessId)
    }
    catch (e : any) {
        throw AppError(e.message, e.statusCode || 400)
    }
}

const getProducts = async (productId : number, productKey : string) : Promise<Product> => {
    try {
        return await ProductRepo.findProducts(productId, productKey)
    }
    catch (e: any) {
        throw AppError(e.message, e.statusCode || 400)
    }
} 

// const searchProducts = (productName : string, productType) : Product[] => {
//     // Returns products that share the same name. Should reduce query count by uppercasing, trimming and returning unique values
//     // This will use use for sharing products within inventories

//     const products = productRepo.findProductByName(productName, productType);
//     const productList : Product[] = []
    
//     if (!products) {
//         return []
//     }
//     for (let i = 0; i < products ; i++) {
//         productList.push( {
//             id: products[i].id, 
//             owner: products[i].owner,
//             product_name: products[i].product_name,
//             image_url: products[i].image_url,
//             product_type: products[i].product_type,
//             tag: products[i].tags,
//         })
//     }
//     return productList 
// }

export const ProductService = {
    getBusinessProducts,
    getProducts
}