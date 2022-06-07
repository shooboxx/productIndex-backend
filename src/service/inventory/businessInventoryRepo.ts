
import db from "../../models";

const findAllStoreItems = async (storeId: number) => {
  const inventory = await db.InventoryItem.findAll({
    where: { business_store_id: storeId },
  });

  if (!inventory) {
    return;
  }
  return inventory;
};

const findInventoryItemById = async (itemId) => {
  const inventory = await db.InventoryItem.findByPk(itemId);
  if (!inventory) {
    return;
  }
  return inventory;
};

module.exports = {
  findInventoryItemById,
  findAllStoreItems
};
