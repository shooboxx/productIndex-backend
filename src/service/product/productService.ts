import { Product } from './productType'
const r = require('./productRepo')

function getAllProducts() : Product[] {
    let productList: Product[] = []
    const product = {
        id: 0, 
        business_id: 0,
        product_key: 0,
        product_name: 'Testing',
        Image_url: 'URL',
        product_type: 'URL',
        description: 'string',
        tag: 'No Tags',
        owner: 1
    }

    productList.push(product)
    return productList
}

const getProductByID = (id : number) : Product => {

    const product = r.findProductById(id)
    
    if (!product) {
        return {} as Product
    } 

    return  {
        id: product.id, 
        owner: product.owner,
        product_name: product.product_name,
        image_url: product.image_url,
        product_type: product.product_type,
        tag: product.tags,
    }
}
const getProductsByName = (productName : string) : Product[] => {
    // Returns products that share the same name. Should reduce query count by uppercasing, trimming and returning unique values
    // This will use use for sharing products within inventories

    const products = r.findProductByName(productName);
    const productList : Product[] = []
    
    if (!products) {
        return []
    }
    for (let i = 0; i < products ; i++) {
        productList.push( {
            id: products[i].id, 
            owner: products[i].owner,
            product_name: products[i].product_name,
            image_url: products[i].image_url,
            product_type: products[i].product_type,
            tag: products[i].tags,
        })
    }
    return productList 
}
const updateProduct = () => {
    //updates the items. Only the owner of the product (business_id) can update an item
    // items can be shared accross businesses and business stores

    return
}
const createProduct = () => {
    // returns product_id

    return ''
}
const deleteProduct = () => {

    return
}

module.exports = { getAllProducts, getProductByID, getProductsByName, updateProduct, createProduct, deleteProduct}