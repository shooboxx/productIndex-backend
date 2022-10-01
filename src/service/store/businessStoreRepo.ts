import { BusinessStore } from "./storeTypes";

const { Op } = require("sequelize");

import db from "../../models";

const findStore = async (storeId : number, storeName : string ) : Promise<BusinessStore> => {
  return await db.BusinessStore.findOne({
      where: {
          //TODO: Add a like and compare by case
          [Op.or]: [{id: storeId, deleted_date: null}, {unique_name: storeName, deleted_date: null}]
      },
      include: [{model: db.StoreContacts, attributes: {exclude: ['insert_date', 'update_date', 'id']}}, {model: db.StoreHours, attributes: {exclude: ['id', 'business_store_id','insert_date', 'update_date']}}, {model: db.Business, attributes: {exclude: ['insert_date', 'update_date', 'deleted_date']}}],
      attributes: {
          exclude: ['insert_date', 'update_date', 'deleted_date']
      }
  }).catch(e => {throw new Error(e.message)})
} 

const reportStore = async (userId : number, storeId : number, reason : string) => {
  const {dataValues} = await db.ReportedStore.create({
    store_id: storeId,
    reported_by: userId,
    reported_reason: reason
  })
  return dataValues
}

export const StoreRepo = {
  findStore,
  reportStore
}