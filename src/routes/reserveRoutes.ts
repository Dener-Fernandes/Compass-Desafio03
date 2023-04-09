import express from "express";
import { ReserveController } from "../controllers/ReserveController";
import { ensureAuthenticated } from "../validators/ensureAuthenticated";
import { reserveDataValidator } from "../validators/reserveDataValidator";
import { idValidator } from "../validators/idValidator";

const reserveRoutes = express.Router();

const reserveController = new ReserveController();

reserveRoutes.post("/", ensureAuthenticated, reserveDataValidator, reserveController.createReserve);
reserveRoutes.get("/", ensureAuthenticated, reserveController.listAllReserves);
reserveRoutes.get("/:id", ensureAuthenticated, idValidator, reserveController.getReserveById);
reserveRoutes.put("/:id", ensureAuthenticated, idValidator, reserveController.updateReserve);
reserveRoutes.delete("/:id", ensureAuthenticated, idValidator, reserveController.deleteReserveById);

export { reserveRoutes }