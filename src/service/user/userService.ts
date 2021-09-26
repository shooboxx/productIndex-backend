import { User, UserLogin } from "./userType"

const userRepo = require('./userRepo')

// Returns id, email and password
const getUser = (emailAddress : string) : UserLogin =>  {
    const user = userRepo.findUser(null, emailAddress) || null
    if (user == null ) throw Error('User not found with that email')
    return {
        id: user.id,
        emailAddress: user.emailAddress,
        password: user.password
    }
}
// Returns user without password (for internal use)
const getUserById = (userId : number) : User => {
    const user = userRepo.findUser(userId, null) || null;

    if (user == null) {
        throw Error('User not found with that Id')
    }
    return user
}

const createUser = (user : User) => {
    try {
        getUser(user.emailAddress)
    }
    catch(e) {
        const newUser = userRepo.addUser(user)
        return newUser.emailAddress
        
    }
    throw new Error(`User already exist with that email address`, )

    
}
const updateUser = (user: User) => {
    
}

const deleteUser = (userId : number) => {

}

const deactivateUser = (userId) => {

}

module.exports = {getUser, getUserById, createUser}