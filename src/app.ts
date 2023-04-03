import express from "express";
import { connect } from "mongoose";
import dotenv from "dotenv";

const app = express();

dotenv.config({ path: "./config.env" });

app.use(express.json());

const dataBase = process.env.DATABASE!.replace("<PASSWORD>", process.env.DATABASE_PASSWORD!);
connect(dataBase).then(() => console.log("DB connection successful!")).catch((err)=> {
  console.log("Could not connect to database");
});

export { app }
