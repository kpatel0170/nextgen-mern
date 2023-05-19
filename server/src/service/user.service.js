const { omit } = require("lodash");
const UserModel = require("../models/user.model");

exports.createUser = async (input) => {
  try {
    const user = await UserModel.create(input);
    return omit(user.toJSON(), "password");
  } catch (e) {
    throw new Error(e.message);
  }
};

exports.getUserById = async (userId) => {
  try {
    const user = await UserModel.findById(userId);
    return user ? omit(user.toJSON(), "password") : null;
  } catch (e) {
    throw new Error(e.message);
  }
};

exports.updateUserById = async (userId, update) => {
  try {
    const user = await UserModel.findByIdAndUpdate(userId, update, { new: true });
    return user ? omit(user.toJSON(), "password") : null;
  } catch (e) {
    throw new Error(e.message);
  }
};

exports.deleteUserById = async (userId) => {
  try {
    const user = await UserModel.findByIdAndDelete(userId);
    return user ? omit(user.toJSON(), "password") : null;
  } catch (e) {
    throw new Error(e.message);
  }
};
