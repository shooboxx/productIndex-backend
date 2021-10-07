import { Product } from '../product/productType' ;

export interface InventoryItem {
   id: number,
   store_id: number,
   item: BusinessItem,
   price: number,
   quantity: number,
   insert_date?: number,
   update_date?: number
}
export interface BusinessItem {
   id: number,
   business_id: number,
   product_key: string,
   product: Product,
   tag: string,
   description: string,
   insert_date?: number,
   update_date?: number
}