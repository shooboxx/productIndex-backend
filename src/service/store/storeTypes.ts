import { InventoryItem } from '../inventory/businessInventoryType';

export interface BusinessStore {
    id?: number,
    business_id : number,
    unique_name: string,
    business_days: BusinessDays,
    inventory: InventoryItem[],
    email_address?: string,
    phone_1?: string,
    phone_2?: string,
    phone_3?: string,
    address_line_1: string,
    address_line_2?: string,
    country: string,
    city: string,
    postal_code: string,
    is_primary?: Boolean,
    temp_or_perm_closure?: string // either TEMP or PERM
    reopen_date?: number
}
export interface BusinessDays {
    business_id: number,
    monday: StoreHours,
    tuesday: StoreHours,
    wednesday: StoreHours,
    thursday: StoreHours,
    friday: StoreHours,
    saturday: StoreHours,
    sunday: StoreHours,
    update_date?: number,
    insert_date?: number
}
interface StoreHours {
    open: string,
    closed: string
}

// export interface StoreHours {
//     business_id: number,
//     monday_open: string,
//     monday_closed: string,
//     tuesday_open: string,
//     tuesday_closed: string,
//     wednesday_open: string,
//     wednesday_closed: string,
//     thursday_open: string,
//     thursday_closed: string,
//     friday_open: string,
//     friday_closed: string,
//     saturday_open: string,
//     saturday_closed: string,
//     sunday_open: string,
//     sunday_closed: string,
//     update_date: number,
//     insert_date: number
// }
