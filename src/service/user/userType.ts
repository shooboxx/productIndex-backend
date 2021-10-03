export interface User {
    id: number,
    role_id: number,
    first_name: string,
    last_name: string,
    email_address: string,
    password: string,
    dob: string,
    gender?: string,
    profile_picture_url?: string,
    country?: string,
    city?: string,
    primary_phone?: string,
    address?: string,
    is_verified: boolean,
    active: boolean,
    deleted_date?: number
    insert_date: number,
    update_date?: number,
}
export interface UserLogin {
    id: number,
    email_address: string,
    password: string,
    password_reset_token?: string,
    password_reset_expires_in?: number

}

// Super details about a user
// interface UserDetail {
//     user: User,
//     business: Business[]
//     activities: Activity[]
// }