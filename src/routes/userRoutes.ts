import express from "express";
import { UserController } from "../controllers/UserController";
import { userDataValidator } from "../validators/userDataValidator";
import { idValidator } from "../validators/idValidator";
import { ensureAuthenticated } from "../validators/ensureAuthenticated";

const userRoutes = express.Router();

const userController = new UserController()

userRoutes.post("/", userDataValidator, userController.createUser);
userRoutes.get("/:id", ensureAuthenticated, idValidator, userController.getUserById);
userRoutes.get("/", ensureAuthenticated, userController.listAllUsers);
userRoutes.put("/:id", ensureAuthenticated, idValidator, userDataValidator, userController.updateUserById);
userRoutes.delete("/:id", ensureAuthenticated, idValidator, userController.deleteUserById);

export { userRoutes }