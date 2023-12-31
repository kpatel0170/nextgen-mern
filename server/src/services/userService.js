import User from "../models/user.js";
import ApiError from "../utils/ApiError.js";
import { HTTP_CODES, AUTH_MESSAGES } from "../config/constants.js";

class UserService {
  /**
   * Create a user
   * @param {Object} userBody
   * @returns {Promise<User>}
   */
  async createUser(userBody) {
    if (await User.isEmailTaken(userBody.email)) {
      throw new ApiError(HTTP_CODES.BAD_REQUEST, AUTH_MESSAGES.EXISTS_EMAIL);
    }
    return User.create(userBody);
  }

  /**
   * Get all users
   * @returns {Promise<User[]>}
   */
  async getAllUsers() {
    return User.find();
  }

  /**
   * Query for users
   * @param {Object} filter - Mongo filter
   * @param {Object} options - Query options
   * @returns {Promise<QueryResult>}
   */
  async queryUsers(filter, options) {
    const users = await User.paginate(filter, options);
    return users;
  }

  /**
   * Get user by ID
   * @param {ObjectId} id - User ID
   * @returns {Promise<User>}
   */
  async getUserById(id) {
    return User.findOne({ _id: id }).exec();
  }

  /**
   * Get user by email
   * @param {string} email - User email
   * @returns {Promise<User>}
   */
  async getUserByEmail(email) {
    return User.findOne({ email }).exec();
  }

  /**
   * Update user by ID
   * @param {ObjectId} userId - User ID
   * @param {Object} updateBody - Data to update
   * @returns {Promise<User>}
   */
  async updateUserById(userId, updateBody) {
    const user = await this.getUserById(userId);
    if (!user) {
      throw new ApiError(HTTP_CODES.NOT_FOUND, AUTH_MESSAGES.USER_NOT_FOUND);
    }
    if (
      updateBody.email &&
      (await User.isEmailTaken(updateBody.email, userId))
    ) {
      throw new ApiError(HTTP_CODES.BAD_REQUEST, AUTH_MESSAGES.EMAIL_EXISTS);
    }
    Object.assign(user, updateBody);
    await user.save();
    return user;
  }

  /**
   * Delete user by ID
   * @param {ObjectId} userId - User ID
   * @returns {Promise<User>}
   */
  async deleteUserById(userId) {
    const user = await this.getUserById(userId);
    if (!user) {
      throw new ApiError(HTTP_CODES.NOT_FOUND, AUTH_MESSAGES.USER_NOT_FOUND);
    }
    await user.remove();
    return user;
  }
}

export default UserService;
