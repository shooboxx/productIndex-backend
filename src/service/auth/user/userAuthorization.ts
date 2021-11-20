// Define roles and create middlewares that control authorization within the application

import { UserRole } from "./authTypes"
const jwt = require('jsonwebtoken')
import AppError from '../../../utils/appError.js'


const roles : UserRole[] = []

function adminOnlyAccess (req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        const userRole = getUserRole(user.userID)
        if (userRole.access_level == 0) {
            return next();
        }
        return res.sendStatus(401)
        
    })
}

function hasAccessLevel(accessLevel) {
    return function (req, res, next) {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if (token == null) return res.sendStatus(401)
    
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) return res.sendStatus(403)
            const userRole = getUserRole(user.userID)
            if (userRole.access_level == accessLevel) {
                return next();
            }
            return res.sendStatus(401)
            
        })
    }
}
const getRole = (roleName) : UserRole => {
    for (let i = 0; i< roles.length; i++ ) {
        if (roles[i].role_name == roleName) {
            return roles[i]
        }
    }
    throw Error("Role not found with that ID")
}

const getUserRole = (userID) : UserRole => {
    // const user = getUserById(userID)
    // return getRoleByID(user.id)
   return {
       id: 1,
       role_name: "User",
       access_level: 5,
       insert_date: 0,
       update_date: 0
   } 
}
const setUserRole = (userID, roleName) => {
    const roleId = getRole(roleName)
}

function authenticateToken (req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) throw new AppError('User login is required', 403)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) throw new AppError('Token invalid or expired', 403)
        req.user_id = user.user_id
        return next()
    })
}

function checkNotAuthenticated (req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return next()
    try {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    }
    catch {
        return next()
    }
    
    return res.status(403).json({"error": "user already logged in"})
}
module.exports = {getRole, adminOnlyAccess, hasAccessLevel, authenticateToken, checkNotAuthenticated}