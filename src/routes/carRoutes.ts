import express from "express";

import { CarController } from "../controllers/CarController";
import { carDataValidator } from "../validators/carDataValidator";
import { idValidator } from "../validators/idValidator";
import { ensureAuthenticated } from "../validators/ensureAuthenticated";

const carRoutes = express.Router();

const carController = new CarController();

carRoutes.post("/", carDataValidator, carController.createCar);
// carRoutes.get("/:id", ensureAuthenticated, idValidator, carController.getCarById);
// carRoutes.get("/", ensureAuthenticated, carController.listAllCars);
// carRoutes.put("/:id", ensureAuthenticated, carDataValidator, idValidator, carController.updateCarById);
// carRoutes.delete("/:id", ensureAuthenticated, idValidator, carController.deleteCarById);

export { carRoutes };
