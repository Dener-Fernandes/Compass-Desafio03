import express from "express";
import { carRoutes } from "./carRoutes";
import { userRoutes } from "./userRoutes";
import { authenticateRoutes } from "./authenticateRoutes";

const router = express.Router();

router.use("/authenticate", authenticateRoutes);
router.use("/car", carRoutes);
router.use("/user", userRoutes);

export { router }
