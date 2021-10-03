import { Business } from "../../business/businessType";

export interface UserBusinessRole {
    userId: number,
    business_role: BusinessRole
}

// maybe consider letting permission data live under a role
export interface BusinessRole {
    id?: number,
    business_id: number,
    key?: string,
    name: string,
    permissions: BusinessPermissions
    insert_date?: number,
    update_date?: number
}

export interface BusinessPermissions {
    id: number
    reviews: boolean,
    transactions: boolean,
    manage_business_profile: boolean
    // should have individual permissions listed here.
    insert_date: number,
    update_date: number
}