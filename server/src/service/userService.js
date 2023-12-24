import User from "../models/user.js";
import ApiError from "../utils/ApiError.js";
// eslint-disable-next-line
import enums from "../json/enums.json" assert { type: "json" };
// eslint-disable-next-line
import messages from "../json/messages.json" assert { type: "json" };

import { HTTP_CODES, AUTH_MESSAGES } from "../config/constants.js";
/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(
      HTTP_CODES.BAD_REQUEST,
      AUTH_MESSAGES.EXISTS_EMAIL
    );
  }
  return User.create(userBody);
};

const getAllUsers = async () => User.find();

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (filter, options) => {
  const users = await User.paginate(filter, options);
  return users;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => User.findOne({ _id: id }).exec();

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => User.findOne({ email }).exec();

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(HTTP_CODES.NOT_FOUND, AUTH_MESSAGES.USER_NOT_FOUND);
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(HTTP_CODES.BAD_REQUEST, AUTH_MESSAGES.EMAIL_EXISTS);
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(HTTP_CODES.NOT_FOUND, AUTH_MESSAGES.USER_NOT_FOUND);
  }
  await user.remove();
  return user;
};

export default {
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById
};
