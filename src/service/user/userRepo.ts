export {}
import { User } from './userType'
let users : any = []
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
        console.log('Passed in:'+ resetToken, "available" + users[i].password_reset_token)
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

const deleteUser = (userId) => {
    // TODO: Implement this
    users = users.filter(user => user.id !== userId)
    return -1
}

const deactivateUser = (userId) => {
    // TODO: Implement this
    return -1
}

module.exports = { addUser, findUser, updateUserLogin, findUserByResetToken }