import { BusinessItem, InventoryItem } from "./businessInventoryType";

const inventoryRepo = require("./businessInventoryRepo");
const storeService = require("../store/businessStoreService");

// const getBusinessItems = async (bId: number) => {
//   try {
//     const items = await inventoryRepo.findBusinessItems(bId);
//     if (!items) throw new Error("No items found for this business");
//     return items;
//   } catch (e) {
//     throw e;
//   }
// };

const getStoreInventory = async (storeId: number) => {
  try {
    const item = await inventoryRepo.findAllStoreItems(storeId);
    if (!item) throw new Error("No item found for this store");
    return item;
  } catch (e) {
    throw e;
  }
};


const getBusinessItemById = async (bItemId: number) => {
  try {
    const item = await inventoryRepo.findBusinessItemById(bItemId);
    if (!item) throw new Error("No item found with that id");
    return item;
  } catch (e) {
    throw e;
  }
};

const updateBusinessItem = (bItem: number): BusinessItem => {
  // not yet implemented
  return {} as BusinessItem;
};
const createBusinessItem = (bItem: number): BusinessItem => {
  // not yet implemented
  return {} as BusinessItem;
};
const deleteBusinessItem = (bItemId: number) => {
  // not yet implemented
  return {} as BusinessItem;
};

const getAllStoreItems = async (storeId: number) => {
  try {
    storeService.getStoreById(storeId);
    const items = inventoryRepo.findAllStoreItems(storeId);
    if (!items) throw new Error("No items found for this store");
    return items;
  } catch (e) {
    throw e;
  }
};

const getInventoryItemById = (itemId: number): InventoryItem => {
  try {
    const item: InventoryItem = inventoryRepo.findInventoryItemById(itemId);
    if (!item) throw new Error("No item found with that id");
    return item;
  } catch (e) {
    throw e;
  }
};

const updateInventoryItem = (item: InventoryItem): InventoryItem => {
  try {
    const currItem: InventoryItem = getInventoryItemById(item.id);

    currItem.store_id = item.store_id || currItem.store_id;
    currItem.price = item.price || currItem.price;
    currItem.quantity = item.quantity || currItem.quantity;
    currItem.update_date = item.update_date || currItem.quantity;

    return inventoryRepo.updateInventoryItem(currItem);
  } catch (e) {
    throw e;
  }
};

const createInventoryItem = async (item : InventoryItem) => {
try {
    const bizItem = await getBusinessItemById(item.item.id)

    if (bizItem) {
        throw new Error('Item already exist in inventory')
    }
}
catch {
    return inventoryRepo.addInventoryItem(item)
}
return {} as InventoryItem
};

const deleteInventoryItem = (itemId: number) => {
  try {
    const exist = getInventoryItemById(itemId);

    if (exist) {
      return inventoryRepo.deleteInventoryItem(itemId);
    }
  } catch (e) {
    throw e;
  }
};

module.exports = {
  getAllStoreItems,
  getInventoryItemById,
  updateInventoryItem,
  deleteInventoryItem,
  getBusinessItemById,
  // getBusinessItems,
  updateBusinessItem,
  createBusinessItem,
  deleteBusinessItem,
  createInventoryItem,
  getStoreInventory
};
