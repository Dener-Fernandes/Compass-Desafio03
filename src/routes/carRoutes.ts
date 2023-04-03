import express from "express";
import { CarController } from "../controllers/CarController";

const carRoutes = express.Router();

const carController = new CarController();

carRoutes.post("/", carController.createCar);

export { carRoutes }