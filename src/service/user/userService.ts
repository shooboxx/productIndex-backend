export {}
const User = require('./userType.ts')
const userRepo = require('./userRepo')

const getUser = (emailAddress : string) => {
    return userRepo.findUser(emailAddress) || null

}
const getUserById = (userId : number) => {
    


    return {
 
    }
}

const createUser = (user : typeof User) => {
    if (getUser(user.emailAddress) == null){
        const newUser = userRepo.addUser(user)
        return newUser.emailAddress
    }
    throw new Error('User already exist with that email address')
}
const updateUser = (user: typeof User) => {
    
}

const deleteUser = (userId : number) => {

}

const deactivateUser = (userId) => {

}

module.exports = {getUser, createUser}