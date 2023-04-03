import express from "express";
import { carRoutes } from "./carRoutes";

const router = express.Router();

router.use("/car", carRoutes);

export { router }
