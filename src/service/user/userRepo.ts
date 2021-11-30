export { };
const Users = require("../../models/users");
const UserTokens = require("../../models/user_tokens");
import { tokenToString } from "typescript";
import { User } from "./userType";

const addUser = async (user: User) => {
  await Users.create({
    email_address: user.email_address,
    password: user.password,
    system_role_id: user.role_id,
    first_name: user.first_name,
    last_name: user.last_name,
    verify_token: user.verify_token,
    insert_date: Date.now(),
    update_date: Date.now(),
  }).catch(err => null)

  return user
};

const findUser = async (userId: number, emailAddress: string) => {
  const user = await Users.findOne({ where: { email_address: emailAddress } })
  if (!user) {
    return
  }
  return user.dataValues
};

const findUserByResetToken = async (resetToken: string) => {
    const user = await Users.findOne({ where: { reset_token: resetToken } });
    if (!user) return null

    return user.dataValues
};

const findUserByVerificationToken = async (verifyToken : string) => {
    const user = await Users.findOne({ where: { verify_token: verifyToken } });
    if (!user) return null

    return user.dataValues
}

const updateUser = async (user: User) => {
    await Users.update({
        first_name: user.first_name,
        last_name: user.last_name,
        password: user.password,
        dob: user.dob,
        gender: user.gender,
        profile_picture_url: user.profile_picture_url,
        country: user.country,
        city: user.city,
        primary_phone: user.primary_phone,
        address: user.address,
        is_verified: user.is_verified,
        reset_expires: user.password_reset_expires_in, // TODO: Change dates to dates and not a number
        reset_token: user.password_reset_token,
        active: user.active,
        deleted_date: user.deleted_date,
        update_date: Date.now(),
    }, {
        where: {
            id: user.id
        }
    })
      return user;

};

const storeRefreshToken = async (user_id: number, refreshToken : string) => {
  await UserTokens.create({
    user_id: user_id,
    refresh_token: refreshToken,
    insert_date: Date.now()  
  })
}

const findRefreshToken = async (userId : number, refreshToken : string) => {
  const token = await UserTokens.findOne({ where: {user_id: userId, refresh_token: refreshToken} });
  if (!token) {
    return
  }
  return token.dataValues
}

const clearRefreshTokens = (userId) => {
  UserTokens.destroy({
    where: {
      user_id: userId
    }
  })
}

module.exports = { addUser, findUser, findUserByResetToken, updateUser, findUserByVerificationToken, storeRefreshToken, findRefreshToken, clearRefreshTokens };
