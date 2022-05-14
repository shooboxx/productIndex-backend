export {};
import db from "../../models";
import { User } from "./userType";
const { Op } = require("sequelize");
// TODO: Create a CreateUser interface for a minimized object
const addUser = async (user: User) => {
  const {dataValues} = await db.Users.create({
    email_address: user.email_address,
    password: user.password,
    system_role_id: user.role_id,
    first_name: user.first_name,
    last_name: user.last_name,
    verify_token: user.verify_token,
    gender: user.gender,
    country: user.country,
    city: user.city,
    state: user.state,
    date_of_birth: user.dob,
    primary_phone_contact: user.primary_phone,
  }).catch(() => null)
  return dataValues;
};

const findUser = async (userId: number, emailAddress: string) => {
  const user = await db.Users.findOne({ where: {
      [Op.or]: [{email_address: emailAddress, deleted_date: null}, { id: userId, deleted_date: null}]}
  });  
  if (!user) {
    return null;
  }
  return user.dataValues;
};

const findUserByResetToken = async (resetToken: string) => {
  const user = await db.Users.findOne({ where: { reset_token: resetToken, deleted_date: null } });
  if (!user) return null;

  return user.dataValues;
};

const findUserByVerificationToken = async (verifyToken: string) => {
  const user = await db.Users.findOne({ where: { verify_token: verifyToken, deleted_date: null } });
  if (!user) return null;

  return user.dataValues;
};

const updateUser = async (user: User) => {
  await db.Users.update(
    {
      first_name: user.first_name,
      last_name: user.last_name,
      password: user.password,
      date_of_birth: user.dob,
      gender: user.gender,
      profile_picture_url: user.profile_picture_url,
      country: user.country,
      city: user.city,
      primary_phone_contact: user.primary_phone,
      state: user.state,
      is_verified: user.is_verified,
      reset_expires: user.reset_expires, // TODO: Change dates to dates and not a number
      reset_token: user.reset_token,
      active: user.active,
      deleted_date: user.deleted_date,
    },
    {
      where: {
        id: user.id,
        deleted_date: null
      },
    }
  );
  return user;
};

const storeRefreshToken = async (user_id: number, refreshToken: string) => {
  await db.UserTokens.create({
    user_id: user_id,
    refresh_token: refreshToken,
  });
};

const findRefreshToken = async (userId: number, refreshToken: string) => {
  const token = await db.UserTokens.findOne({
    where: { user_id: userId, refresh_token: refreshToken, deleted_date: null },
  });
  if (!token) {
    return;
  }
  return token.dataValues;
};

const clearRefreshTokens = (userId) => {
  db.UserTokens.destroy({
    where: {
      user_id: userId,
    },
  });
};

module.exports = {
  addUser,
  findUser,
  findUserByResetToken,
  updateUser,
  findUserByVerificationToken,
  storeRefreshToken,
  findRefreshToken,
  clearRefreshTokens,
};
