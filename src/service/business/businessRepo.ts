import { Business } from "./businessType";
const db = require("../../../config/database.js");
const Businesses = require("../../models/business");
const businesses: Business[] = [];

const findUserBusinesses = async (userId) => {
  const list: any = [];
  const businesses = await Businesses.findAll({
    where: { created_by: userId },
  });
  if (!businesses) {
    return null;
  }
  for (let i = 0; i < businesses.length; i++) {
    list.push(businesses[i].dataValues);
  }
  return list;
};

const findBusinessById = async (businessId: number) => {
  const business = await Businesses.findByPk(businessId);
  if (!businesses) {
    return null;
  }
  return business.dataValues;
};

const createBusiness = async (newBusiness: Business) => {
  const biz = newBusiness.name.toUpperCase().replace(" ", "");
  const businesses = await Businesses.findAll({
    where: {
      business_name: db.where(
        db.fn("UPPER", db.fn("REPLACE", db.col("business_name"), " ", "")),
        "=",
        biz
      ),
    },
    raw: true,
  });

  if (businesses.length != 0) {
    return;
  }

  await Businesses.create({
    business_name: newBusiness.name,
    description: newBusiness.description,
    category: newBusiness.category,
    active: true,
    email_address: newBusiness,
    created_by: newBusiness.created_by,
    insert_date: Date.now(),
  }).catch((err) => console.log(err));

  return newBusiness;
};

const removeBusiness = async (businessId) => {
  const business = await Businesses.findByPk(businessId);

  if (!business) {
    return;
  }
  business.update({
    delete_date: Date.now(),
  });

  return business;
};

const setBusinessActiveStatus = async (businessId, status) => {
  const business = await Businesses.findByPk(businessId);

  if (!business) {
    return;
  }
  business.update({
    active: status,
    update_date: Date.now(),
  });

  return business;
};
const updateBusiness = async (businessId, updatedBusiness: Business) => {
  await Businesses.update(
    {
      business_name: updatedBusiness.name,
      description: updatedBusiness.description,
      category: updatedBusiness.category,
      profile_picture_url: updatedBusiness.profile_picture_url,
      active: updatedBusiness.active,
      update_date: Date.now(),
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

const businessNameMatch = async (bname: string) => {
  //TODO: Figure out how to name match (trim and lowercase)
  const businesses = await Businesses.findAll({
    where: db.fn("upper", db.col("business_name"), bname),
    raw: true,
  });
  if (!businesses) {
    return null;
  }
  return businesses;
};

module.exports = {
  findBusinessById,
  findUserBusinesses,
  createBusiness,
  removeBusiness,
  setBusinessActiveStatus,
  updateBusiness,
  businessNameMatch,
};
