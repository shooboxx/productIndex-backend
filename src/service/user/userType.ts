export interface User {
    id: number,
    roleId: number,
    firstName: string,
    lastName: string,
    emailAddress: string,
    password: string,
    dob: string,
    gender?: string,
    profilePicture?: string,
    country?: string,
    city?: string,
    primaryPhone?: string,
    address?: string,
    isVerified: boolean,
    active: boolean,
    deletedDate?: number
    insertDate: number,
    updateDate?: number,
}
export interface UserLogin {
    id: number,
    emailAddress: string,
    password: string,
    passwordResetToken?: string,
    passwordResetExpiresIn?: number

}

// Super details about a user
// interface UserDetail {
//     user: User,
//     business: Business[]
//     activities: Activity[]
// }