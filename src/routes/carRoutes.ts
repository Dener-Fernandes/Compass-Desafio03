import express from "express";

import { CarController } from "../controllers/CarController";
import { carDataValidator } from "../validators/carDataValidator";
import { idValidator } from "../validators/idValidator";
import { ensureAuthenticated } from "../validators/ensureAuthenticated";

const carRoutes = express.Router();

const carController = new CarController();

carRoutes.post("/", carDataValidator, carController.createCar);
carRoutes.get("/:id", idValidator, carController.getCarById);
carRoutes.get("/", carController.listAllCars);
carRoutes.put(
  "/:id",
  carDataValidator,
  idValidator,
  carController.updateCarById,
);
carRoutes.delete("/:id", idValidator, carController.deleteCarById);

export { carRoutes };
