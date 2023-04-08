import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { IReserve as CreateReserveDTO } from "../interfaces/IReserve";
import mongoose from "mongoose";
import { AppError } from "../errors/AppError";

const requestValidation = Joi.object({
  start_date: Joi.string().required().messages({ "string.required": "Start date is required" }),
  end_date: Joi.string().required().messages({ "string.required": "End date is required" }),
  id_car: Joi.string().required().messages({ "string.required": "Id car is required" }),
});

async function reserveDataValidator(req: Request, res: Response, next: NextFunction): Promise<void> {
  await requestValidation.validateAsync(req.body);

  const { id_car }:CreateReserveDTO = req.body;

  if (!mongoose.isValidObjectId(id_car)) {
    throw new AppError("Invalid id", 400);
  }
  
  return next();
}

export { reserveDataValidator }