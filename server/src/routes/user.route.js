const express = require('express');
const userRouter = express.Router();
const validate = require('../middleware/validate');
const userValidation = require('../validation/user.validation');
const userController = require('../controller/user.controller');

userRouter.get('/', userController.getUsers);
userRouter.get('/:id', validate(userValidation.getUser), userController.getUserById);
userRouter.patch('/:id', validate(userValidation.updateUser), userController.updateUser);
userRouter.delete('/:id', validate(userValidation.deleteUser), userController.deleteUser);

module.exports = userRouter;
