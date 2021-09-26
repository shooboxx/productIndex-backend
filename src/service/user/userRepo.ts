export {}
const {User} = require('./userType')
const users : any = []

const addUser = (user: typeof User) => {
    console.log(user)
    users.push(user)
    return users[users.length - 1]
}

const findUser = (userId, emailAddress : string) => {
    for (let i = 0; i< users.length; i++) {
        if (users[i].emailAddress == emailAddress) {
            return users[i]
        }
    }
}

module.exports = {addUser, findUser}