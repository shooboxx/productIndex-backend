
import { Product } from './productType'
import db from '../../models'
const { Op } = require("sequelize");

const findBusinessProducts = async (businessId : number, page: number, pageSize: number) : Promise<Product[]> => {
    let clause = {
        where: {
            business_id: businessId
        }, 
        attributes: {
            exclude: ['deleted_date', 'insert_date', 'update_date']
        }
    }
    if (page >= 0 && pageSize)  {
        clause['limit'] = pageSize 
        clause['offset'] = page * pageSize
    }

    return await db.Product.findAndCountAll(clause).catch(e => {throw new Error(e.message)})

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