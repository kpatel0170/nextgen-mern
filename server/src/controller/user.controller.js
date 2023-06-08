const { omit } = require("lodash");
const userService = require("../service/user.service");
const logger = require("../utils/logger");

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields: name, email, password",
      });
    }

    const user = await userService.createUser(name, email, password);
    return res.status(201).json({ status: true, data: user });
  } catch (error) {
    logger.error(error.message);
    return res.status(500).json({ status: false, error: error.message });
  }
};

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    return res.status(200).json({ status: true, data: users });
  } catch (error) {
    logger.error(error.message);
    return res.status(500).json({ status: false, error: error.message });
  }
};

// Get a single user by ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);

    if (!user) {
      return res.status(404).json({
        status: false,
        error: `User not found with ID: ${id}`,
      });
    }

    return res.status(200).json({ status: true, data: user });
  } catch (error) {
    logger.error(error.message);
    return res.status(500).json({ status: false, error: error.message });
  }
};

// Update a user
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userData = omit(req.body, ["password"]); // Exclude password from update

    const updatedUser = await userService.updateUser(id, userData);

    if (!updatedUser) {
      return res.status(404).json({
        status: false,
        error: `User not found with ID: ${id}`,
      });
    }

    return res.status(200).json({ status: true, data: updatedUser });
  } catch (error) {
    logger.error(error.message);
    return res.status(500).json({ status: false, error: error.message });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await userService.deleteUser(id);

    if (!deletedUser) {
      return res.status(404).json({
        status: false,
        error: `User not found with ID: ${id}`,
      });
    }

    return res.status(200).json({ status: true, data: deletedUser });
  } catch (error) {
    logger.error(error.message);
    return res.status(500).json({ status: false, error: error.message });
  }
};
