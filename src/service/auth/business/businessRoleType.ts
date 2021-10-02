import { Business } from "../../business/businessType";

export interface UserBusinessRole {
    userId: number,
    business: Business,
    role: BusinessRole
}

// maybe consider letting permission data live under a role
export interface BusinessRole {
    id: number,
    key: number,
    name: string,
    permissions: BusinessPermissions
    insertDate: number,
    updateDate: number
}

export interface BusinessPermissions {
    id: number
    reviews: boolean,
    transactions: boolean,
    manageBusinessProfile: boolean
    // should have individual permissions listed here.
    insertDate: number,
    updateDate: number
}