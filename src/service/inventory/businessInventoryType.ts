import { Product } from '../product/productType' ;

export interface InventoryItem {
   id: number,
   store_id : number,
   product_id: number,
   price?: number,
   quantity: number,
   public: boolean,
   discounted_price: number;
   show_price?: boolean,
   Product: Product
}