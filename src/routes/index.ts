import express from "express";
import { carRoutes } from "./carRoutes";
import { userRoutes } from "./userRoutes";

const router = express.Router();

router.use("/car", carRoutes);
router.use("/user", userRoutes);

export { router }
