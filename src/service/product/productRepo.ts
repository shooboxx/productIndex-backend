
import { Product } from './productType'
import db from '../../models'
const { Op } = require("sequelize");

const findBusinessProducts = async (businessId) : Promise<Product[]> => {
    return await db.Product.findAll({
        where: {
            business_id: businessId
        }, 
        attributes: {
            exclude: ['deleted_date', 'insert_date', 'update_date']
        }
    }).catch(e => {throw new Error(e.message)})

}

const findProducts = async (productId, productKey) : Promise<Product> => {
    return await db.Product.findAll({
        where: {
            //TODO: Add a like in here for product_key
                [Op.or]: [{id: productId}, { sku: productKey}]
        }, 
        attributes: {
            exclude: ['deleted_date', 'insert_date', 'update_date']
        }
    }).catch(e => {throw new Error(e.message)})

}

export const ProductRepo = {
    findBusinessProducts,
    findProducts
}