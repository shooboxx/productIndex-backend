import { User } from "./userType"
import AppError from '../../utils/appError.js'
const bcrypt = require('bcrypt')
const util = require('../../utils/utils.js')

const userRepo = require('./userRepo')

// Returns id, email and password
const getUserByEmail = async (emailAddress: string) => {
    // if (!emailAddress) throw new Error('Email address is required')
    console.log('This was successfully called')

    const found = await userRepo.findUser(null, emailAddress).then(user => {
        if (!user) {
            return null
        }
        return user
    }).catch(err => {
        throw new AppError(err, 400)
    })
    return found

}
// Returns user without password (for internal use)
const getUserById = (userId: number): User => {
    if (!userId) {
        throw Error('User is required')
    }
    // console.log('something')
    const user = userRepo.findUser(userId, null) || null;

    if (user.length === 0) {
        throw new AppError('User not found with that Id', 404)
    }
    return user
}

const getUserByResetToken = (resetToken: string): User => {
    if (!resetToken) throw new Error('reset_token is required')
    const user = userRepo.findUserByResetToken(resetToken);

    if (!user) throw new AppError('User not found', 404)
    return user
}

// Returns full info about a user. For admin purposes only
const getUserMasterDetail = () => {
    // TODO: Implement this
}

const createUser = async (user: User) => {
    if (!user.email_address) { throw new AppError('Email address is required', 400) }
    if (!user.password) throw new AppError('Password is required', 400)
    try {
        const found = await getUserByEmail(user.email_address)
        if (!found) {
            return await userRepo.addUser(user)
        }
        throw Error('User already exist')

    }
    catch (e: any) {
        throw e
    }

}
const updateUserProfile = (user: User) => {
    // TODO: Implement this
    const currUser = getUserById(user.id)

    currUser.first_name = user.first_name || currUser.first_name
    currUser.last_name = user.last_name || currUser.last_name
    currUser.dob = user.dob || currUser.dob
    currUser.gender = user.gender || currUser.gender
    currUser.profile_picture_url = user.profile_picture_url || currUser.profile_picture_url
    currUser.country = user.country || currUser.country
    currUser.city = user.city || currUser.city
    currUser.primary_phone = user.primary_phone || currUser.primary_phone
    currUser.address = user.address || currUser.address
    currUser.update_date = Date.now()

    return userRepo.updateUser(currUser)
}
const updateResetToken = async (emailAddress, resetToken, resetTokenExpiry) => {
    try {
        const user = await getUserByEmail(emailAddress)
        user.password_reset_token = resetToken
        user.password_reset_expires_in = resetTokenExpiry

        return userRepo.updateUser(user)
    }
    catch (err) {
        throw err
    }
}

const updatePassword = async (userId, emailAddress, newPassword, newPasswordConfirm) => {
    const user = await getUserByEmail(emailAddress)
    if (!user) throw AppError('No user found', 404)
    if (userId !== user.id) throw AppError('User not allowed', 403)
    if (newPassword !== newPasswordConfirm) {
        throw AppError("Passwords do not match", 400)
    }
    user.password = await bcrypt.hash(newPassword, 10)
    user.password_reset_token = ''
    user.password_reset_expires_in = 0
    user.password_last_updated = Date.now()
    // -- TODO: destroy active sessions and remember me cookies
    return userRepo.updateUser(user)

}

const deactivateUser = (userId: number) => {
    try {
        const user = getUserById(userId)
        user.active = false
        return userRepo.updateUser(user);
    }
    catch (e) {
        throw e
    }
}

const verifyUser = (userId: number) => {
    try {
        const user = getUserById(userId)
        user.is_verified = true
        return userRepo.updateUser(user)
    }
    catch (e) {

    }
}

const deleteUser = (userId: number) => {
    try {
        const user = getUserById(userId)
        user.deleted_date = Date.now()
        return userRepo.updateUser(user);
    }
    catch (e) {
        throw e
    }
}

const setAciveStatus = (userId, active) => {
    try {
        const user = getUserById(userId)
        user.active = active
        return userRepo.updateUser(user);
    }
    catch (e) {
        throw e
    }
}
module.exports = { getUserByEmail, getUserById, createUser, updateResetToken, updatePassword, getUserByResetToken, deleteUser, deactivateUser, updateUserProfile, verifyUser, setAciveStatus }