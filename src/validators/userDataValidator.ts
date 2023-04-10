import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { CreateUserDTO } from "../interfaces/CreateUserDTO";
import { cpfValidator } from "./cpfValidator";
import { AppError } from "../errors/AppError";

const requesValidation = Joi.object({
  name: Joi.string().required().messages({ "string.required": "Name is required" }),
  cpf: Joi.string().required().messages({ "string.required": "CPF is required" }),
  birth: Joi.date().required().messages({ "date.base": "Date is required" }),
  email: Joi.string().email().required().messages({ "string.required": "Email is required" }),
  password: Joi.string().min(6).empty().required().messages({
    "string.min": "password should be min 6 characters",
    "string.empty": "password cannot be an empty field", 
    "string.required": "password is required" }), 
  cep: Joi.string().pattern(/^\d{5}[\-]?\d{3}$/).required().messages({
    "string.pattern.base": "CEP must follow one of these thow formats: 12345-678, 12345678"
  }),
  qualified: Joi.boolean().required().messages({ "boolean.base": "Qualified must have value true of false" })
});

async function userDataValidator(req: Request, res: Response, next: NextFunction) {
  await requesValidation.validateAsync(req.body);

  const { cpf, birth }: CreateUserDTO = req.body;
  const isCPFValid = cpfValidator(cpf);

  if (!isCPFValid) {
    throw new AppError("CPF invalid", 400);
  }

  const date = new Date(birth);
  const currentYear = new Date().getFullYear();
  const yearBirthOnly = date.getFullYear();

  if (currentYear - yearBirthOnly < 18) {
    throw new AppError("You must be at least 18 to register", 400);
  }

  return next();
}

export { userDataValidator }