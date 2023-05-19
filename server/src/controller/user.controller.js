const { omit } = require("lodash");
const { createUser, getUserById, updateUserById, deleteUserById } = require("../service/user.service");
const logger = require("../utils/logger");

exports.createUserHandler = async (req, res) => {
  try {
    const user = await createUser(req.body);
    return res.send(user);
  } catch (e) {
    logger.error(e.message);
    return res.status(409).send(e.message);
  }
};

exports.getUserHandler = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await getUserById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }
    return res.send(user);
  } catch (e) {
    logger.error(e.message);
    return res.status(500).send("Server Error");
  }
};

exports.updateUserHandler = async (req, res) => {
  try {
    const { userId } = req.params;
    const updatedUser = await updateUserById(userId, req.body);
    if (!updatedUser) {
      return res.status(404).send("User not found");
    }
    return res.send(updatedUser);
  } catch (e) {
    logger.error(e.message);
    return res.status(500).send("Server Error");
  }
};

exports.deleteUserHandler = async (req, res) => {
  try {
    const { userId } = req.params;
    const deletedUser = await deleteUserById(userId);
    if (!deletedUser) {
      return res.status(404).send("User not found");
    }
    return res.send(deletedUser);
  } catch (e) {
    logger.error(e.message);
    return res.status(500).send("Server Error");
  }
};
