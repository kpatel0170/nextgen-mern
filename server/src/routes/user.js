import express from "express";
import validate from "../middleware/validate.js";
import userController from "../controller/user.js";
import userValidation from "../validation/user.js";
import authMiddleware from "../middleware/auth.js";

const userRouter = express.Router();

userRouter
  .route("/")
  .post(
    authMiddleware.auth("manageUsers"),
    validate(userValidation.createUser),
    userController.createUser
  )
  .get(
    authMiddleware.auth("getUsers"),
    validate(userValidation.getUsers),
    userController.getUsers
  );

userRouter
  .route("/:userId")
  .get(
    authMiddleware.auth("getUsers"),
    validate(userValidation.getUser),
    userController.getUser
  )
  .patch(
    authMiddleware.auth("manageUsers"),
    validate(userValidation.updateUser),
    userController.updateUser
  )
  .delete(
    authMiddleware.auth("manageUsers"),
    validate(userValidation.deleteUser),
    userController.deleteUser
  );

export default userRouter;
