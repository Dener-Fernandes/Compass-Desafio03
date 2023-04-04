import express, { Request, Response, NextFunction } from "express";

import "express-async-errors";

import { connect } from "mongoose";
import { AppError } from "./errors/AppError";
import { ValidationError } from "joi";

import { router } from "./routes";

import dotenv from "dotenv";

const app = express();

dotenv.config({ path: "./config.env" });

app.use(express.json());

app.use(router);

const dataBase = process.env.DATABASE!.replace("<PASSWORD>", process.env.DATABASE_PASSWORD!);
connect(dataBase).then(() => console.log("DB connection successful!")).catch((err)=> {
  console.log("Could not connect to database");
});


app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  if (error instanceof ValidationError) {
    if (error.message.includes("\"")) {
      let newErrorMessage = error.message.split("\"");
      error.message = `${newErrorMessage[1]}${newErrorMessage[2]}`;
    }

    return res.status(400).json({ message: error.message });
  }

  return res.status(500).json({ message: error.message });
})


export { app }
