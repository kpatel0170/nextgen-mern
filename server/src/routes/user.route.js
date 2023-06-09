const express = require('express');
const userRouter = express.Router();
const { getUsers, getUserById, updateUser, deleteUser } = require('../controller/user.controller');

userRouter.get('/', getUsers);
userRouter.get('/:id', getUserById);
userRouter.patch('/:id', updateUser);
userRouter.delete('/:id', deleteUser);

module.exports = userRouter;
