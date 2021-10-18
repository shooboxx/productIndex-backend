import { User, UserLogin } from "./userType"
import AppError from '../../utils/appError.js'

const userRepo = require('./userRepo')

// Returns id, email and password
const getUserLoginByEmail = (emailAddress : string) : UserLogin =>  {
    if (!emailAddress) throw new Error('Email address is required')
    const user = userRepo.findUser(null, emailAddress) || null
    if (!user) throw Error('User not found with that email')
    return {
        id: user.id,
        email_address: user.email_address,
        password: user.password,
        password_reset_token: user.password_reset_token,
        password_reset_expires_in: user.password_reset_expires_in
    }
}
// Returns user without password (for internal use)
const getUserById = (userId : number) : User => {
    if (!userId) {
        throw Error('User is required')
    }
    const user = userRepo.findUser(userId, null) || null;

    if (!user) {
        throw new AppError('User not found with that Id', 404)
    }
    return user
}

const getUserLoginByResetToken = (resetToken : string) : UserLogin => {
    if (!resetToken) throw new Error('reset_token is required')
    const user = userRepo.findUserByResetToken(resetToken);

    if (!user) throw new AppError('User not found', 404)
    return user
}

// Returns full info about a user. For admin purposes only
const getUserMasterDetail = () => {

}

const createUser = (user : User) => {
    if (!user.email_address) {throw new AppError('Email address is required', 400)}
    if (!user.password) throw new AppError('Password is required', 400)

    try {

        getUserLoginByEmail(user.email_address)
    }
    catch(e) {
        const newUser = userRepo.addUser(user)
        return newUser.email_address  
    }
    throw new AppError('User already exist with that email address', 400)

    
}
const updateUserProfile = (user: User) => {

    
}

const updateUserLogin = (updatedUser : UserLogin) => {
    try {
        const user = getUserById(updatedUser.id)
        const userLogin = getUserLoginByEmail(user.email_address)
        
        // ensures that if data is null, do not override
        const uUser : UserLogin = {
            id: updatedUser.id,
            email_address: updatedUser.email_address || userLogin.email_address,
            password: updatedUser.password || userLogin.password,
            password_reset_token: updatedUser.password_reset_token || userLogin.password_reset_token,
            password_reset_expires_in: updatedUser.password_reset_expires_in || userLogin.password_reset_expires_in
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