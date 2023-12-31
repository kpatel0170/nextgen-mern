import UserService from "./userService.js";
import TokenService from "./tokenService.js";
import Token from "../models/token.js";
import ApiError from "../utils/ApiError.js";
import { HTTP_CODES, AUTH_MESSAGES } from "../config/constants.js";

const userService = new UserService();
const tokenService = new TokenService();

class AuthService {
  /**
   * Login with username and password
   * @param {string} email
   * @param {string} password
   * @returns {Promise<User>}
   */
  async loginUserWithEmailAndPassword(email, password) {
    const user = await userService.getUserByEmail(email);
    if (!user || !(await user.isPasswordMatch(password))) {
      throw new ApiError(
        HTTP_CODES.UNAUTHORIZED,
        AUTH_MESSAGES.INVALID_CREDENTIALS
      );
    }
    return user;
  }

  /**
   * Logout
   * @param {string} refreshToken
   * @returns {Promise}
   */
  async logout(refreshToken) {
    const refreshTokenDoc = await Token.findOne({
      token: refreshToken,
      type: "refreshToken",
      blacklisted: false
    });
    if (!refreshTokenDoc) {
      throw new ApiError(HTTP_CODES.BAD_REQUEST, AUTH_MESSAGES.INVALID_TOKEN);
    }
    await Token.deleteOne({ _id: refreshTokenDoc._id });
  }

  /**
   * Refresh auth tokens
   * @param {string} refreshToken
   * @returns {Promise<Object>}
   */
  async refreshAuth(refreshToken) {
    try {
      const refreshTokenDoc = await tokenService.verifyToken(
        refreshToken,
        "refreshToken"
      );
      const user = await userService.getUserById(refreshTokenDoc.user);
      if (!user) {
        throw new Error();
      }
      await Token.deleteOne({ _id: refreshTokenDoc._id });
      return tokenService.generateAuthTokens(user);
    } catch (error) {
      throw new ApiError(
        HTTP_CODES.UNAUTHORIZED,
        AUTH_MESSAGES.UNAUTHENTICATED
      );
    }
  }

  /**
   * Reset password
   * @param {string} resetPasswordToken
   * @param {string} newPassword
   * @returns {Promise}
   */
  async resetPassword(resetPasswordToken, newPassword) {
    try {
      const resetPasswordTokenDoc = await tokenService.verifyToken(
        resetPasswordToken,
        "resetPasswordToken"
      );
      const user = await userService.getUserById(resetPasswordTokenDoc.user);
      if (!user) {
        throw new Error();
      }
      await userService.updateUserById(user.id, { password: newPassword });
      await Token.deleteMany({ user: user.id, type: "resetPasswordToken" });
    } catch (error) {
      throw new ApiError(HTTP_CODES.UNAUTHORIZED, "Password reset failed");
    }
  }

  /**
   * Verify email
   * @param {string} verifyEmailToken
   * @returns {Promise}
   */
  async verifyEmail(verifyEmailToken) {
    try {
      const verifyEmailTokenDoc = await tokenService.verifyToken(
        verifyEmailToken,
        "verifyEmailToken"
      );
      const user = await userService.getUserById(verifyEmailTokenDoc.user);
      if (!user) {
        throw new Error();
      }
      await Token.deleteMany({ user: user.id, type: "verifyEmailToken" });
      await userService.updateUserById(user.id, { isEmailVerified: true });
    } catch (error) {
      throw new ApiError(HTTP_CODES.UNAUTHORIZED, "Email verification failed");
    }
  }
}

export default AuthService;
