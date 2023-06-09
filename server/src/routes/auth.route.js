const express = require('express');
const authController = require('../controller/auth.controller');
const validateResource = require('../middleware/validateResource');
const { createUserSchema } = require('../schema/user.schema');

const authRouter = express.Router();

authRouter.post('/register', validateResource(createUserSchema), authController.registerUser);
authRouter.post('/login', authController.loginUser);

module.exports = authRouter;
