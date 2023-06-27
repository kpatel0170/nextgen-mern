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
    return user.toJSON();
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUsers = async () => {
  try {
    const users = await UserModel.find();
    return users.map((user) => user.toJSON());
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserById = async (id) => {
  try {
    const user = await UserModel.findById(id);
    if (!user) {
      throw new Error(`User not found with ID: ${id}`);
    }
    return user.toJSON();
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateUser = async (id, userData) => {
  try {
    const user = await UserModel.findByIdAndUpdate(id, userData, {
      new: true,
    });
    if (!user) {
      throw new Error(`User not found with ID: ${id}`);
    }
    return user.toJSON();
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteUser = async (id) => {
  try {
    const user = await UserModel.findByIdAndDelete(id);
    if (!user) {
      throw new Error(`User not found with ID: ${id}`);
    }
    return user.toJSON();
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
