export interface UserBusinessRole {
    id: number,
    roleId: number,
    businessId: number,
    userId: number,
    insertDate: number,
    updateDate: number
}

// maybe consider letting permission data live under a role
export interface BusinessRole {
    id: number,
    name: string,
    description?: string,
    permissionsID: number,
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

// Something to considered here.

// export interface BusinessRole {
//     id: number,
//     businessId: number,
//     name: string,
//     description?: string,
//     reviewAccess: true,
//     manageBusinessAccess: true,
//     allowTransactions: true,
//     updateDate: number,
//     insertDate: number
// }

// export interface UserBusinessRole {
//     id: number,
//     businessroleId: number,
//     userId: number,
//     insertDate: number,
//     updateDate: number
// }