import { BusinessStore } from "./storeTypes";


import db from "../../models";

const findStoreByBusinessId = async (businessId: number) => {
  const businessStore = await db.BusinessStore.findAll({
    where: { business_id: businessId },
    raw: true,
  });
  if (!businessStore) {
    return;
  }
  return businessStore;
};

const findStoreById = async (storeId: number) => {
  const businessStore = await db.BusinessStore.findByPk(storeId, { raw: true });
  if (!businessStore) {
    return;
  }
  return businessStore;
};

const createBusinessStore = async (store: BusinessStore) => {
  const store_name = store.unique_name.toUpperCase().split(" ").join("");

  const business_store = await db.BusinessStore.findAll({
    where: {
      unique_name: db.sequelize.where(
        db.sequelize.fn("UPPER", db.sequelize.fn("REPLACE", db.sequelize.col("unique_name"), " ", "")),
        "like",
        `%${store_name}%`
      ),
    },
    raw: true,
  });

  if (business_store.length > 0) {
    return;
  }

  await db.BusinessStore.create({
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
  await db.BusinessStore.update(
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
  const storeSearch = await db.BusinessStore.findAll({
    include: [
      {model: db.StoreHours},
      {
        model: db.Business,
        attributes: ["id"],
        include: [{ model: db.BusinessTags }],
      }
    ],
    where: { id: storeId },
  });
  return storeSearch;
};

const getInventoryByStoreId = async (storeId: number) => {
  const storeSearch = await db.BusinessStore.findAll({
    attributes: ["id"],
    include: [
      {
        model: db.InventoryItem,
        attributes: ["id"],
        include: [{ model: db.BusinessItem }],
      }
    ],
    where: { id: storeId },
  });
  return storeSearch;
}

module.exports = {
  findStoreByBusinessId,
  findStoreById,
  createBusinessStore,
  updateStore,
  deleteStore,
  getStoreDetails,
  getInventoryByStoreId
};
