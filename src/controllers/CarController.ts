import { Request, Response } from "express";
import { ICar } from "../interfaces/ICar";
import { CarsRepository } from "../repositories/CarsRepository";
import { CarService } from "../services/CarService";

const carsRepository = CarsRepository.getInstance();
const carService = new CarService(carsRepository);

interface CreateCarDTO extends ICar {}

class CarController {
  async createCar(req: Request, res: Response): Promise<Response> {
    const { model, color, year, value_per_day, accessories, number_of_passenger }: CreateCarDTO = req.body;
    
    const { car, total, limit, offset, offsets } = await carService.createCar({ 
      model, 
      color, 
      year, 
      value_per_day, 
      accessories, 
      number_of_passenger 
    });

    return res.status(201).json({ car, total, limit, offset, offsets });

  }
}

export { CarController }