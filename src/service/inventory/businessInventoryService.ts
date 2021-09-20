import { BusinessInventory } from './businessInventoryType';
const product = require('./../product/productService')
const r = require('./businessInventoryRepo')

const getAllInventories = (business_store_id : number) : BusinessInventory[] => {

    let inventories = r.findInventories(business_store_id)
    let inventoryList: BusinessInventory[] = []

    for (let i = 0; i < inventories.length; i++) {

        inventoryList.push({
            id: inventories[i].id,
            product: product.getProductByID(inventories[i].product_id),
            product_key: inventories[i].product_key,
            price: inventories[i].price,
            description: inventories[i].description,
            quantity: inventories[i].quantity,
            tags: inventories[i].product_tags
        })
    }
    return inventoryList
}

const getInventory = (business_store_id : number, inventory_id : number) : BusinessInventory => {
    const data = r.findInventory( business_store_id, inventory_id)
    return {
        id: data.id,
        product: product.getProductByID(data.product_id),
        product_key: data.product_key,
        price: data.price,
        description: data.description,
        quantity: data.quantity,
        tags: data.product_tags
    }
}

const createInventory = (data : any) => {
    // check to see if product exists.. if it does, returns id
    // check to see if inventory item exist, if it does, returns error



    const newProduct = product.createProduct(data)
    const newInventory = r.addInventory(data)
    let err = ''
    if (!newProduct) {
        err += 'Failed to add product.'
    }
    if (!newInventory) {
        err +=' Failed to add inventory.'
    }
    if (err !== '') {
        return {
            'status': 'failed', 
            'error': err
        }
    }
    return data
}

const updateInventory = () => {

    return
}
const deleteProduct = () => {

    return
}

module.exports = { getAllInventories, getInventory, createInventory}