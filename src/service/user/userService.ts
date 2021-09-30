import { User, UserLogin } from "./userType"

const userRepo = require('./userRepo')

// Returns id, email and password
const getUserLoginByEmail = (emailAddress : string) : UserLogin =>  {
    const user = userRepo.findUser(null, emailAddress) || null
    if (user == null ) throw Error('User not found with that email')
    return {
        id: user.id,
        emailAddress: user.emailAddress,
        password: user.password,
        passwordResetToken: user.passwordResetToken,
        passwordResetExpiresIn: user.passwordResetExpiresIn
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
const getUserLoginByResetToken = (resetToken : string) : UserLogin => {

    return {
        id: 0,
        emailAddress: '',
        password: '',
        passwordResetToken: '',
        passwordResetExpiresIn: 0
    }
}

// Returns full info about a user. For admin purposes only
const getUserMasterDetail = () => {

}

const createUser = (user : User) => {
    try {
        getUserLoginByEmail(user.emailAddress)
    }
    catch(e) {
        const newUser = userRepo.addUser(user)
        return newUser.emailAddress
        
    }
    throw new Error(`User already exist with that email address`, )

    
}
const updateUserProfile = (user: User) => {

    
}

const updateUserLogin = (updatedUser : UserLogin) => {
    try {
        const user = getUserById(updatedUser.id)
        const userLogin = getUserLoginByEmail(user.emailAddress)
        
        // ensures that if data is null, do not override
        const uUser : UserLogin = {
            id: updatedUser.id,
            emailAddress: updatedUser.emailAddress || userLogin.emailAddress,
            password: updatedUser.password || userLogin.password,
            passwordResetToken: updatedUser.passwordResetToken || userLogin.passwordResetToken,
            passwordResetExpiresIn: updatedUser.passwordResetExpiresIn || userLogin.passwordResetExpiresIn
        }
         return userRepo.updateUserLogin(uUser)
    } 
    catch (err) {
        throw err
    }
}

const deleteUser = (userId : number) => {

}

const deactivateUser = (userId) => {

}
module.exports = { getUserLoginByEmail, getUserById, createUser, updateUserLogin, getUserLoginByResetToken }