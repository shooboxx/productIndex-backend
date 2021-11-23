export { };
const { db } = require("../../../config/config.js");
const Users = require("../../models/users");
import { User } from "./userType";
let users: any = [];

const addUser = async (user: User) => {
  await Users.create({
    email_address: user.email_address,
    password: user.password,
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

module.exports = { addUser, findUser, findUserByResetToken, updateUser, findUserByVerificationToken };
