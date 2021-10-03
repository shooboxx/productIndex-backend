export interface BusinessStore {
    id: number,
    business_id : number,
    unique_name: string,
    email_address: string,
    phone_1?: string,
    phone_2?: string,
    phone_3?: string,
    address_line_1: string,
    address_line_2?: string,
    country: string,
    city: string,
    postal_code: string,
    is_primary: Boolean,
    temp_or_perm_closure: string // either TEMP or PERM
    reopen_date?: number
}