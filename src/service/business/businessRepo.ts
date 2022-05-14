import db from "../../models";
import { Business } from "./businessType";
const { Op } = require("sequelize");



const findUserBusinesses = async (userId) => {
  const list: any = [];
  const businesses = await db.Business.findAll({
    where: { created_by: userId },
  });
  if (!businesses) {
    return;
  }
  for (let i = 0; i < businesses.length; i++) {
    list.push(businesses[i].dataValues);
  }
  return list;
};

const findBusinessById = async (businessId: number) => {
  const business = await db.Business.findByPk(businessId);
  if (!business) {
    return;
  }
  return business.dataValues;
};


const createBusiness = async (newBusiness: Business) => {
  const biz = newBusiness.name.toUpperCase().replace(" ", "");
  const businesses = await db.Business.findAll({
    where: {
      business_name: db.sequelize.where(
        db.sequelize.fn("UPPER", db.sequelize.fn("REPLACE", db.sequelize.col("business_name"), " ", "")),
        "like",
        `%${biz}%`
      ),
    },
    raw: true,
  });

  if (businesses.length != 0) {
    return;
  }

  await db.Business.create({
    business_name: newBusiness.name,
    description: newBusiness.description,
    category: newBusiness.category,
    active: true,
    email_address: newBusiness,
    created_by: newBusiness.created_by,
  }).catch((err) => console.log(err));

  return newBusiness;
};

const removeBusiness = async (businessId) => {
  const business = await db.Business.findByPk(businessId);

  if (!business) {
    return;
  }
  business.update({
    delete_date: new Date(),
  });

  return business;
};

const setBusinessActiveStatus = async (businessId, status) => {
  const business = await db.Business.findByPk(businessId);

  if (!business) {
    return;
  }
  business.update({
    active: status,
  });

  return business;
};
const updateBusiness = async (businessId, updatedBusiness: Business) => {
  await db.Business.update(
    {
      business_name: updatedBusiness.name,
      description: updatedBusiness.description,
      category: updatedBusiness.category,
      profile_picture_url: updatedBusiness.profile_picture_url,
      active: updatedBusiness.active,
    },
    {
      where: {
        id: businessId,
      },
    }
  );
  return updatedBusiness;
};

const findBusinessMasterDetail = () => { };



module.exports = {
  findBusinessById,
  findUserBusinesses,
  createBusiness,
  removeBusiness,
  setBusinessActiveStatus,
  updateBusiness,
};
