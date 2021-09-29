export {}
const {User} = require('./userType')
const users : any = []
import { UserLogin } from './userType'

const addUser = (user: typeof User) => {
    console.log(user)
    users.push(user)
    return users[users.length - 1]
}

const findUser = (userId, emailAddress : string) => {
    for (let i = 0; i< users.length; i++) {
        if (users[i].emailAddress == emailAddress || users[i].id == userId) {
            return users[i]
        }
    }
}

const updateUserLogin = (user: UserLogin) => {
    for (let i = 0; i< users.length; i++) {
        if (users[i].id == user.id) {
            users[i].emailAddress = user.emailAddress;
            users[i].password = user.password
            users[i].passwordResetExpiresIn = user.passwordResetExpiresIn
            users[i].passwordResetToken = user.passwordResetToken
            return users[i]
        }
    }
}
module.exports = {addUser, findUser, updateUserLogin}