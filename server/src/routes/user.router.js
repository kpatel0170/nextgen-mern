const express = require("express");
const router = express.Router();
const { createUserHandler } = require("../controller/user.controller");
const validateResource = require("../middleware/validateResource");
const { createUserSchema } = require("../schema/user.schema");


router.post("/signup", validateResource(createUserSchema), createUserHandler);
// router.post("/login", signIn);
// router.patch("/:userID", updateUser);

module.exports = router;