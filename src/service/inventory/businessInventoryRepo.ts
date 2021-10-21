// import { BusinessInventory } from './businessInventoryType'
import { InventoryItem } from './businessInventoryType';

// const findInventories = (business_store_id: number) : BusinessInventory[] => {
//     return [] as BusinessInventory[]
// }
// const findInventory = ( business_store_id: number, inventory_id : number) : BusinessInventory => {
//     return {} as BusinessInventory
// }
// const addInventory = (data : any) => {
//     return ''
// }


let inventoryItem : InventoryItem[] = []

const findAllStoreItems = (storeId) => {
    let storeItems : InventoryItem[] = []
    for (let i = 0; i < inventoryItem.length; i++) {
        if (inventoryItem[i].store_id === storeId) {
            storeItems.push(inventoryItem[i])
        }
    }  
    return storeItems
}

const findInventoryItemById = (itemId) => {
    for (let i = 0; i < inventoryItem.length; i++) {
        if (inventoryItem[i].id === itemId) {
            return inventoryItem[i]
        }
    }  
    return null
}
const addInventoryItem = (item : InventoryItem) => {
    inventoryItem.push(item)
}
const updateInventoryItem = (item : InventoryItem) => {
    for (let i = 0; i < inventoryItem.length; i++) {
        if (inventoryItem[i].id === item.id) {
            inventoryItem[i] = item
            return inventoryItem[i]
        }
    }
    return null
}
const deleteInventoryItem = (itemId : number) => {
    inventoryItem = inventoryItem.filter(item => item.id !== itemId)
    return -1
}
module.exports = { findInventoryItemById, findAllStoreItems, addInventoryItem, updateInventoryItem, deleteInventoryItem}