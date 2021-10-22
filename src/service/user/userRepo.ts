export {}
import { User } from './userType'
let users : any = []

const addUser = (user: User) => {
    users.push(user)
    return users[users.length - 1]
}

const findUser = (userId : number, emailAddress : string) => {
    for (let i = 0; i< users.length; i++) {
        if (users[i].email_address == emailAddress || users[i].id == userId) {
            return users[i]
        }
    }
    return null
}
const findUserByResetToken = (resetToken : string) => {
    for (let i = 0; i< users.length; i++) {
        console.log('Passed in:'+ resetToken, "available" + users[i].password_reset_token)
        if (users[i].password_reset_token == resetToken) {

            return users[i]
        }
    }
    return null
}

const updateUser = (user: User) => {
    for (let i = 0; i< users.length; i++) {
        if (users[i].id == user.id) {
            users[i].first_name = user.first_name
            users[i].last_name = user.last_name
            users[i].password = user.password
            users[i].dob = user.dob
            users[i].gender = user.gender
            users[i].profile_picture_url = user.profile_picture_url
            users[i].country = user.country
            users[i].city = user.city
            users[i].primary_phone = user.primary_phone
            users[i].address = user.address
            users[i].is_verified = user.is_verified
            users[i].password_reset_expires_in = user.password_reset_expires_in
            users[i].password_reset_token = user.password_reset_token
            users[i].active = user.active
            users[i].deleted_date = user.deleted_date
            users[i].update_date = Date.now()

            return users[i]
        }
    }
}

module.exports = { addUser, findUser, findUserByResetToken, updateUser }