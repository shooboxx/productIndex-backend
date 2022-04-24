// Define roles and create middlewares that control authorization within the application

const jwt = require('jsonwebtoken')
import AppError from '../../../utils/appError.js'
const sysRole = require('./systemRole/systemRoleService')

function adminOnlyAccess (req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        const userRole = sysRole.getUserRole(user.userID)
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
            const userRole = sysRole.getUserRole(user.userID)
            if (userRole.access_level == accessLevel) {
                return next();
            }
            return res.sendStatus(401)
            
        })
    }
}

function authenticateToken (req, res, next) {
    const token = req.cookies.access_token
    if (token == null) throw new AppError('User login is required', 403)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) throw new AppError('Token invalid or expired', 401)
        req.user_id = user.user_id
        return next()
    })
}

function checkNotAuthenticated (req, res, next) {
    const token = req.cookies.access_token
    
    if (token === undefined || token === null) {
        return next()
    }
    
    return res.status(403).json({"error": "User already logged in"})
}
module.exports = {adminOnlyAccess, hasAccessLevel, authenticateToken, checkNotAuthenticated}