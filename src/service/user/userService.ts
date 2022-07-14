import { User } from "./userType";
import AppError from "../../utils/appError.js";
const bcrypt = require("bcrypt");
const userRepo = require("./userRepo");
import { UserErrors } from "./userConst";

const getUserByEmail = async (emailAddress: string) => {
  if (!emailAddress) throw new AppError(UserErrors.EmailAddressRequired, 400);
  return await userRepo.findUser(null, emailAddress.toLowerCase())
    .then(user => user)
    .catch(err => {throw new AppError(err, 400)});
};

// Returns user without password (for internal use)
const getUserById = async (userId: number) => {
  if (!userId)  throw AppError(UserErrors.UserIdRequired, 400);
  const user = (await userRepo.findUser(userId, null));

  if (!user) {
    throw new AppError(UserErrors.UserNotFound, 404);
  }
  return user;
};
// Returns user
const getUserByVerificationToken = async (token: string) => {
  if (!token) throw new AppError(UserErrors.VerificationTokenRequired, 400);
  const foundUser = await userRepo.findUserByVerificationToken(token)
    .then((user) => {
      if (!user) {
        throw new AppError(UserErrors.InvalidVerificationToken, 400);
      }
      if (user.is_verified) {
        throw new AppError(UserErrors.UserVerified, 304)
      }
      return user;
    })
    .catch((err) => {
      throw new AppError(err, 400);
    });
  return foundUser;
};

const getUserByResetToken = (resetToken: string): User => {
  if (!resetToken) throw new AppError(UserErrors.ResetTokenRequired, 400);
  const user = userRepo.findUserByResetToken(resetToken);

  if (!user) throw new AppError(UserErrors.UserNotFound, 404);
  return user;
};

const createUser = async (user: User) => {
  try {
    _validate_user_profile_completeness(user)
    const found = await getUserByEmail(user.email_address);
    if (!found) {
      let createdUser = await userRepo.addUser(user);
      createdUser['password'] = undefined
      createdUser['deleted_date'] = undefined
      return createdUser
    }
    throw new AppError(UserErrors.UserExist, 400);
  } catch (e: any) {
    throw e;
  }
};
const updateUserProfile = async (user: User) => {
  try {
    await getUserById(user.id); 
    return await userRepo.updateUser(user);
  }
  catch (err) {
   throw err;
  }
  
};

const updateResetToken = async (emailAddress, resetToken, resetTokenExpiry) => {
  try {
    const user = await getUserByEmail(emailAddress);
    if (!user) throw AppError(UserErrors.UserNotFound, 404)
    user.reset_token = resetToken;
    user.reset_expires = resetTokenExpiry;

    return userRepo.updateUser(user);
  } catch (err) {
    throw err;
  }
};

const updatePassword = async (
  userId,
  emailAddress,
  newPassword,
  newPasswordConfirm
) => {
  const user = await getUserByEmail(emailAddress);
  if (!user) throw AppError(UserErrors.UserNotFound, 404);
  if (userId !== user.id) throw AppError(UserErrors.UserNotAllowed, 403);
  if (newPassword !== newPasswordConfirm) {
    throw AppError(UserErrors.PasswordsMismatch, 400);
  }
  user.password = await bcrypt.hash(newPassword, 10);
  user.reset_token = null;
  user.reset_expires = null;
  user.password_last_updated = new Date();
  const found = userRepo.updateUser(user);
  if (found) userRepo.clearRefreshTokens(userId);
  return found;
};

const verifyUser = async (token: string) => {
  try {
    if (!token) throw new Error(UserErrors.VerificationTokenRequired);
    const user: User = await getUserByVerificationToken(token);

    user.is_verified = true;
    user.verify_token = '';
    return userRepo.updateUser(user);
  } catch (e) {
    throw e;
  }
};

const deleteUser = async (userId: number) => {
  try {
    const user = await getUserById(userId);

    user.deleted_date = new Date();
    return await userRepo.updateUser(user);
  } catch (e) {
    throw e;
  }
};

const storeRefreshToken = async (userId: number, refreshToken: string) => {
  if (!refreshToken) throw new AppError(UserErrors.RefreshTokenRequired, 400);
  if (!userId) throw new AppError(UserErrors.UserIdRequired, 400);
  return await userRepo.storeRefreshToken(userId, refreshToken);
};

const findRefreshToken = async (refreshToken: string) => {
  return await userRepo.findRefreshToken(refreshToken);
};

const deleteRefreshToken = async(token) => {
  return await userRepo.deleteRefreshToken(token)
}
const _validate_user_profile_completeness = (user) => {
  if (!user.email_address) throw new AppError(UserErrors.EmailAddressRequired, 400);
  if (!user.password) throw new AppError(UserErrors.PasswordRequired, 400);
  if (!user.first_name) throw new AppError(UserErrors.FirstNameRequired, 400)
  if (!user.last_name) throw new AppError(UserErrors.LastNameRequired, 400)
  if (!user.gender) throw new AppError(UserErrors.GenderRequired, 400)
  if (!user.dob) throw new AppError(UserErrors.DOBRequired, 400)

  return true
}

module.exports = {
  getUserByEmail,
  getUserById,
  createUser,
  updateResetToken,
  updatePassword,
  getUserByResetToken,
  deleteUser,
  updateUserProfile,
  verifyUser,
  storeRefreshToken,
  findRefreshToken,
  deleteRefreshToken
};
