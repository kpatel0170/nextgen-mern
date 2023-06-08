const express = require("express");
const authRouter = express.Router();
const { registerUser, loginUser } = require("../controller/auth.controller");
const validateResource = require("../middleware/validateResource");
const { createUserSchema } = require("../schema/user.schema");


authRouter.post("/register", validateResource(createUserSchema), registerUser);
authRouter.post("/login", loginUser);

module.exports = authRouter;