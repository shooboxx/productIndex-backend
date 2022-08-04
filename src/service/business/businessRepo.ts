import db from "../../models";

const findBusinessById = async (businessId: number) => {
  return await db.Business.findOne({
    where: {
      id: businessId,
      deleted_date: null
    },
    include: [{model: db.BusinessTags, attributes: {exclude: ['insert_date', 'update_date', 'business_id']}}]
  }).catch(e => {throw new Error(e.message)});
};

export const BusinessRepo = {
  findBusinessById
}