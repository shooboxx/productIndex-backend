import { Product } from '../product/productType' ;

export interface BusinessInventory {
   id: number,
   product: Product,
   product_key?: string,
   quantity: number,
   price: number,
   description?: string,
   tags?: string,
   insert_date?: string,
   update_date?: string,
   deliverable_flag?: boolean,
   orderable_flag?: boolean,
   reservable_flag?: boolean
}