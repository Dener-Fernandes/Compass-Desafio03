import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { ICar as CreateCarDTO } from "../interfaces/ICar";
import { AppError } from "../errors/AppError";

const requestValidation = Joi.object({
  model: Joi.string().required().messages({ "string.required": "Description is required" }),
  color: Joi.string().required().messages({ "string.required": "Color is required" }),
  year: Joi.string().required().messages({ "string.required": "Year is required" }),
  value_per_day: Joi.number().required().messages({ "number.required": "Value per day is required" }),
  accessories: Joi.array().required().messages({ "array.required": "Accessories is required" }),
  number_of_passengers: Joi.number().required().messages({ "number.required": "Number of passengers is required" }),
});

async function carDataValidator(req: Request, res: Response, next: NextFunction): Promise<void> {
  await requestValidation.validateAsync(req.body);

  const { accessories, year }: CreateCarDTO = req.body;

  if (!accessories.length) {
    throw new AppError("It is necessary to have a least one accessory", 400);
  } else if (accessories.length > 1) {
    for (let i = 0; i < accessories.length; i++) {
      let accessoryQuantity = 0;
      for (let j = 0; j < accessories.length; j++) {
        if (accessories[i].description == accessories[j].description) {
          accessoryQuantity++;
        }
      }
  
      if (accessoryQuantity > 1) {
        throw new AppError("It can't have repeated accessory", 400);
      }
    }
  }

  if (year < "1950" || year > "2023") {
    throw new AppError("The car's fabrication year must be between 1950 and 2023", 400);
  }

  return next();
}

export { carDataValidator }