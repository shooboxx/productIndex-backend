
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

const findProducts = async (productId) : Promise<Product> => {
    return await db.Product.findAll({
        where: {
                id: productId
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