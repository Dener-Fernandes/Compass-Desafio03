import express from "express";

import { carRoutes } from "./carRoutes";
import { userRoutes } from "./userRoutes";
import { authenticateRoutes } from "./authenticateRoutes";
import { reserveRoutes } from "./reserveRoutes";

const router = express.Router();

router.use("/authenticate", authenticateRoutes);
router.use("/car", carRoutes);
router.use("/user", userRoutes);
router.use("/reserve", reserveRoutes);

export { router }