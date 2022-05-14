// import { BusinessInventory } from './businessInventoryType'
import { InventoryItem } from "./businessInventoryType";
import db from "../../models";

// const findInventories = (business_store_id: number) : BusinessInventory[] => {
//     return [] as BusinessInventory[]
// }
// const findInventory = ( business_store_id: number, inventory_id : number) : BusinessInventory => {
//     return {} as BusinessInventory
// }
// const addInventory = (data : any) => {
//     return ''
// }

let inventoryItem: InventoryItem[] = [];

const findAllStoreItems = async (storeId: number) => {
  const inventory = await db.InventoryItem.findAll({
    where: { business_store_id: storeId },
  });

  if (!inventory) {
    return;
  }
  return inventory;
};

const findInventoryItemById = (itemId) => {
  for (let i = 0; i < inventoryItem.length; i++) {
    if (inventoryItem[i].id === itemId) {
      return inventoryItem[i];
    }
  }
  return null;
};
const addInventoryItem = (item: InventoryItem) => {
  inventoryItem.push(item);
};
const updateInventoryItem = (item: InventoryItem) => {
  for (let i = 0; i < inventoryItem.length; i++) {
    if (inventoryItem[i].id === item.id) {
      inventoryItem[i] = item;
      return inventoryItem[i];
    }
  }
  return null;
};
const deleteInventoryItem = (itemId: number) => {
  inventoryItem = inventoryItem.filter((item) => item.id !== itemId);
  return -1;
};
module.exports = {
  findInventoryItemById,
  findAllStoreItems,
  addInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
};
