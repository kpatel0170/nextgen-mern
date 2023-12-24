// import logger from "../config/logger";
import userService from "../service/userService.js";
import catchAsync from "../utils/catchAsync.js";
import ApiError from "../utils/ApiError.js";
import pick from "../utils/pick.js";
import { HTTP_CODES } from "../config/constants.js";

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(HTTP_CODES.OK).send(user);
});

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["name", "role"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const result = await userService.queryUsers(filter, options);
  res.send(result);
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(HTTP_CODES.NOT_FOUND, "User not found");
  }
  res.send(user);
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(HTTP_CODES.NO_CONTENT).send();
});

export default { createUser, getUsers, getUser, updateUser, deleteUser };
