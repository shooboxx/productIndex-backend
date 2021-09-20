import { BusinessInventory } from './businessInventoryType'

const findInventories = (business_store_id: number) : BusinessInventory[] => {
    return [] as BusinessInventory[]
}
const findInventory = ( business_store_id: number, inventory_id : number) : BusinessInventory => {
    return {} as BusinessInventory
}
const addInventory = (data : any) => {
    return ''
}
module.exports = { findInventories, findInventory, addInventory}