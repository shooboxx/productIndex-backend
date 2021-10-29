export {};
const { db } = require("../../../config/config.js");
const Users = require("../../models/users");
import { User } from "./userType";
let users: any = [];

const addUser = async (user: User) => {
  await Users.create({
    email_address: user.email_address,
    password: user.password,
    first_name: "Bob",
    last_name: "Sagget",
    insert_date: Date.now(),
    update_date: Date.now(),
  })
    .then((newUser) => {
      return newUser;
    })
    .catch((err) => console.log(err));
};

const findUser = async (userId: number, emailAddress: string) => {
  const user = await Users.findOne({ where: { email_address: emailAddress } })
  return user.dataValues
};

const findUserByResetToken = async (resetToken: string) => {
  return await Users.findOne({ where: { reset_token: resetToken } });
};

const updateUser = (user: User) => {
  for (let i = 0; i < users.length; i++) {
    if (users[i].id == user.id) {
      users[i].first_name = user.first_name;
      users[i].last_name = user.last_name;
      users[i].password = user.password;
      users[i].dob = user.dob;
      users[i].gender = user.gender;
      users[i].profile_picture_url = user.profile_picture_url;
      users[i].country = user.country;
      users[i].city = user.city;
      users[i].primary_phone = user.primary_phone;
      users[i].address = user.address;
      users[i].is_verified = user.is_verified;
      users[i].password_reset_expires_in = user.password_reset_expires_in;
      users[i].password_reset_token = user.password_reset_token;
      users[i].active = user.active;
      users[i].deleted_date = user.deleted_date;
      users[i].update_date = Date.now();

      return users[i];
    }
  }
};

module.exports = { addUser, findUser, findUserByResetToken, updateUser };
