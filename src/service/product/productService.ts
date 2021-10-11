import { Product } from './productType'
const productRepo = require('./productRepo')
const businessService = require('../business/businessService')

const getBusinessProducts = (bId : number): Product[] => {
    try {
        businessService.getBusinessById(bId)
        const products : Product[] = productRepo.findBusinessProducts(bId)
        if (!products) throw new Error('No products found for this business')
        return products
    }
    catch (e) {
        throw e
    }
}

const getProductById = (pId : number) : Product => {

    const product : Product =  productRepo.findProductById(pId)
    
    if (!product) {
        throw new Error('No product found with that id')
    } 
    return product

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

const updateProduct = (product : Product) => { 

    return
}
const createProduct = (product : Product) => {
    // returns product_id

    return ''
}
const deleteProduct = () => {

    return
}

module.exports = { getBusinessProducts, getProductById }