const express = require('express');
const userRouter = express.Router();
const validate = require('../middleware/validate');
const userValidation = require('../validation/user.validation');
const userController = require('../controller/user.controller');

userRouter.get('/', userController.getUsers);
userRouter.get('/:id', userController.getUserById);
userRouter.patch('/:id', userController.updateUser);
userRouter.delete('/:id', userController.deleteUser);

module.exports = userRouter;
