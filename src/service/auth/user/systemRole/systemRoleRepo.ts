import { SystemRole } from "./authTypes"
const SystemRoles = require('../../../../models/roles')

const findRoleId = async (roleName : string) => {
    const role = await SystemRoles.findOne({ where: {role_name: roleName}})
    if (!role) return null

    return role.dataValues.id
}
const findRole = async (roleId : number) => {
    const role = await SystemRoles.findOne({ where: {id: roleId}})
    if (!role) return null

    return role.dataValues
}

const setUserRole = async (userId, roleName) => {

}

module.exports = { findRoleId, findRole}