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
    deletedDate?: Date
}
