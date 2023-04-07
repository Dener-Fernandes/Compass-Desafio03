import express from "express";
import { UserController } from "../controllers/UserController";
import { userDataValidator } from "../validators/userDataValidator";
import { idValidator } from "../validators/idValidator";

const userRoutes = express.Router();

const userController = new UserController()

userRoutes.post("/", userDataValidator, userController.createUser);
userRoutes.get("/:id", idValidator, userController.getUserById);
userRoutes.get("/", userController.listAllUsers);
userRoutes.put("/:id", idValidator, userDataValidator, userController.updateUserById);
userRoutes.delete("/:id", idValidator, userController.deleteUserById);

export { userRoutes }