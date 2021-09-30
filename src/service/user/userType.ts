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
    insertDate: number,
    updateDate?: number,
    active: boolean,
    deletedDate?: number
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