import express from "express";
import { UserController } from "../controllers/UserController";
import { userDataValidator } from "../validators/userDataValidator";

const userRoutes = express.Router();

const userController = new UserController()

userRoutes.post("/", userDataValidator, userController.createUser);

export { userRoutes }