import AuthService from "../services/authService.js";
import UserService from "../services/userService.js";
import TokenService from "../services/tokenService.js";
import EmailService from "../services/emailService.js";
import catchAsync from "../utils/catchAsync.js";
import { HTTP_CODES, AUTH_MESSAGES } from "../config/constants.js";

const authService = new AuthService();
const userService = new UserService();
const tokenService = new TokenService();
const emailService = new EmailService();

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthTokens(user);
  return res
    .status(HTTP_CODES.OK)
    .json({ message: AUTH_MESSAGES.REGISTER_SUCCESS, user, tokens });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  return res
    .status(HTTP_CODES.OK)
    .json({ message: AUTH_MESSAGES.LOGIN_SUCCESS, user, tokens });
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(HTTP_CODES.NO_CONTENT_FOUND).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(
    req.body.email
  );
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  res.status(HTTP_CODES.NO_CONTENT_FOUND).send();
});

const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.query.token, req.body.password);
  res.status(HTTP_CODES.NO_CONTENT_FOUND).send();
});

const sendVerificationEmail = catchAsync(async (req, res) => {
  const verifyEmailToken = await tokenService.generateVerifyEmailToken(
    req.user
  );
  await emailService.sendVerificationEmail(req.user.email, verifyEmailToken);
  res.status(HTTP_CODES.NO_CONTENT_FOUND).send();
});

const verifyEmail = catchAsync(async (req, res) => {
  await authService.verifyEmail(req.query.token);
  res.status(HTTP_CODES.NO_CONTENT_FOUND).send();
});

export default {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail
};
