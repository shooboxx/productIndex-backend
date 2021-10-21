import { User, UserLogin } from "./userType"
import AppError from '../../utils/appError.js'
const bcrypt = require('bcrypt')

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
    // TODO: Implement this
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
    // TODO: Implement this
    
}
const updateResetToken = (emailAddress, resetToken, resetTokenExpiry) => {
    try {
        const userLogin = getUserLoginByEmail(emailAddress)
        userLogin.password_reset_token =  resetToken
        userLogin.password_reset_expires_in = resetTokenExpiry
        
         return userRepo.updateUserLogin(userLogin)
    } 
    catch (err) {
        throw err
    }
}

const updatePassword = async (emailAddress, newPassword, newPasswordConfirm) => {
    const user = getUserLoginByEmail(emailAddress)
    if (!user) throw AppError('No user found', 404)
    if (newPassword !== newPasswordConfirm) {
        throw AppError("Passwords do not match", 400)
    } 
    user.password = await bcrypt.hash(newPassword, 10)
    user.password_reset_token = ''
    user.password_reset_expires_in = 0
    user.password_last_updated = Date.now()
        // -- TODO: destroy active sessions and remember me cookies
    return userRepo.updateUserLogin(user)

}

const deleteUser = (userId : number) => {
    try {
        getUserById(userId)
        return userRepo.deleteUser(userId);
    }
    catch (e) {
        throw e
    }
}

const deactivateUser = (userId) => {
    try {
        getUserById(userId)
        return userRepo.deactivateUser(userId);
    }
    catch (e) {
        throw e
    }   
}

module.exports = { getUserLoginByEmail, getUserById, createUser, updateResetToken, updatePassword, getUserLoginByResetToken, deleteUser, deactivateUser }