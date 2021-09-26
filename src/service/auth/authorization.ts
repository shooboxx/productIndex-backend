// Define roles and create middlewares that control authorization within the application

import { Role } from "./authTypes"
const jwt = require('jsonwebtoken')


const roles : Role[] = []

function adminOnlyAccess (req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        const userRole = getUserRole(user.userID)
        if (userRole.accessLevel == 0) {
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
            if (userRole.accessLevel == accessLevel) {
                return next();
            }
            return res.sendStatus(401)
            
        })
    }
}
const getRoleByID = (roleID) : Role => {
    for (let i = 0; i< roles.length; i++ ) {
        if (roles[i].id == roleID) {
            return roles[i]
        }
    }
    throw Error("Role not found with that ID")
}

const getUserRole = (userID) : Role => {
    // const user = getUserById(userID)
    // return getRoleByID(user.id)
   return {
       id: 1,
       roleName: "User",
       accessLevel: 5,
       insertDate: 0,
       updateDate: 0
   } 
}
const setUserRole = (userID, roleID) => {

}
module.exports = {getRoleByID, adminOnlyAccess, hasAccessLevel}