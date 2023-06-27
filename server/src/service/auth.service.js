const { omit } = require('lodash');
const UserModel = require('../models/user.model');

const createUser = async (name, email, password) => {
  try {
    // Check if the email is already registered
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw new Error('Email is already registered');
    }

    // Create the user
    const user = await new UserModel({
      name,
      email,
      password,
    });
    await user.save();
    const sanitizedUser = omit(user.toJSON(), 'password');
    return sanitizedUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

const loginUser = async (email, password) => {
  try {
    // Check if the email is already registered
    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
      throw new Error('Email is not registered');
    }

    // Check if the password is correct
    const isMatch = await existingUser.comparePassword(password);
    if (!isMatch) {
      throw new Error('Password is incorrect');
    }

    const sanitizedUser = omit(existingUser.toJSON(), 'password');
    return sanitizedUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createUser,
  loginUser,
};
