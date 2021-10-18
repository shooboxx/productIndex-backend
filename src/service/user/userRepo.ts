export {}
import { User } from './userType'
const users : any = []
import { UserLogin } from './userType'

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
        if (users[i].password_reset_token == resetToken) {
            return users[i]
        }
    }
    return null
}
const updateUserLogin = (user: UserLogin) => {
    for (let i = 0; i< users.length; i++) {
        if (users[i].id == user.id) {
            users[i].email_address = user.email_address;
            users[i].password = user.password
            users[i].password_reset_expires_in = user.password_reset_expires_in
            users[i].password_reset_token = user.password_reset_token
            return users[i]
        }
    }
}
module.exports = { addUser, findUser, updateUserLogin, findUserByResetToken }