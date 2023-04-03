import { Request, Response } from "express";
import { ICar } from "../interfaces/ICar";
import { CarsRepository } from "../repositories/CarsRepository";
import { CarService } from "../services/CarService";

const carsRepository = CarsRepository.getInstance();
const carService = new CarService(carsRepository);

interface CarDTO extends ICar {}

class CarController {
  async createCar(req: Request, res: Response): Promise<Response> {
    const { model, color, year, value_per_day, acessories, number_of_passenger }: CarDTO = req.body;
    
    const carCreated = await carService.createCar({ 
      model, 
      color, 
      year, 
      value_per_day, 
      acessories, 
      number_of_passenger 
    });

    return res.status(201).json({ carCreated });

  }
}

export { CarController }