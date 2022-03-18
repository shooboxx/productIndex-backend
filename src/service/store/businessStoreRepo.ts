import { BusinessStore } from "./storeTypes";
import { Business } from "../business/businessType";
const sequelize = require("sequelize");
const db = require("../../../config/database.js");
const Store = require("../../models/stores");
const business = require("../../models/business");
const business_tags = require("../../models/business_tags");
const store_hours = require("../../models/business_store_hours")

const findStoreByBusinessId = async (businessId: number) => {
  const businessStore = await Store.findOne({
    where: { business_id: businessId },
    raw: true,
  });
  if (!businessStore) {
    return;
  }
  return businessStore;
};

const findStoreById = async (storeId: number) => {
  const businessStore = await Store.findByPk(storeId, { raw: true });
  if (!businessStore) {
    return;
  }
  return businessStore;
};

const createBusinessStore = async (store: BusinessStore) => {
  const store_name = store.unique_name.toUpperCase().split(" ").join("");

  const business_store = await Store.findAll({
    where: {
      unique_name: db.where(
        db.fn("UPPER", db.fn("REPLACE", db.col("unique_name"), " ", "")),
        "=",
        store_name
      ),
    },
    raw: true,
  });

  if (business_store.length > 0) {
    return;
  }

  await Store.create({
    business_id: store.business_id,
    unique_name: store.unique_name,
    email_address: store.email_address,
    phone_1: store.phone_1,
    phone_2: store.phone_2,
    phone_3: store.phone_3,
    address_line_1: store.address_line_1,
    address_line_2: store.address_line_2,
    country: store.country,
    city: store.city,
    postal_code: store.postal_code,
    is_primary: store.is_primary,
  }).catch((err) => null);

  return store;
};

const updateStore = async (store: BusinessStore) => {
  await Store.update(
    {
      unique_name: store.unique_name,
      email_address: store.email_address,
      phone_1: store.phone_1,
      phone_2: store.phone_2,
      phone_3: store.phone_3,
      address_line_1: store.address_line_1,
      address_line_2: store.address_line_2,
      country: store.country,
      city: store.city,
      postal_code: store.postal_code,
      is_primary: store.is_primary,
      temp_or_perm_closure: store.temp_or_perm_closure,
      reopen_date: store.reopen_date,
    },
    {
      where: {
        id: store.id,
      },
      raw: true,
    }
  );

  return store;
};

const deleteStore = async (storeId) => {};

const getStoreDetails = async (storeId: number) => {
  const businessSearch = await Store.findAll({
    include: [
      {model: store_hours}, { model: business, required: true , attributes: ['id'] , include: [{ model: business_tags }] },
    ],
    where: { id: storeId },
  });
  return businessSearch;
};

module.exports = {
  findStoreByBusinessId,
  findStoreById,
  createBusinessStore,
  updateStore,
  deleteStore,
  getStoreDetails,
};
