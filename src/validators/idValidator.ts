import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { AppError } from "../errors/AppError";

async function idValidator(req: Request, res: Response, next: NextFunction): Promise<void> {
  const id: string  = req.params.id;

  if (!mongoose.isValidObjectId(id)) {
    throw new AppError("Invalid id", 400);
  }

  return next();
}

export { idValidator }