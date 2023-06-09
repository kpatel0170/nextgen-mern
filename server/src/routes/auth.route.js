const express = require('express');
const authController = require('../controller/auth.controller');
const authValidation = require('../validation/auth.validation');
const validate = require('../middleware/validate');
const authRouter = express.Router();

authRouter.post('/register', validate(authValidation.register), authController.registerUser);
authRouter.post('/login', validate(authValidation.login), authController.loginUser);

module.exports = authRouter;
