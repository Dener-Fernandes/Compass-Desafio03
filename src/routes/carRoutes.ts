import express from "express";
import { CarController } from "../controllers/CarController";
import { createCarValidator } from "../validators/createCarValidator";
import { idValidator } from "../validators/idValidator";

const carRoutes = express.Router();

const carController = new CarController();

carRoutes.post("/", createCarValidator, carController.createCar);

carRoutes.delete("/:id", idValidator, carController.deleteCarById);

export { carRoutes }