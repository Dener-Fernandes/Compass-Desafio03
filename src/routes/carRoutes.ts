import express from "express";
import { CarController } from "../controllers/CarController";
import { createCarValidator } from "../validators/createCarValidator";

const carRoutes = express.Router();

const carController = new CarController();

carRoutes.post("/", createCarValidator, carController.createCar);

export { carRoutes }