import { ICarRepository } from "../interfaces/ICarRepository";
import { ICar } from "../interfaces/ICar";
import { AppError } from "../errors/AppError";
import mongoose from "mongoose";

interface CreateCarDTO extends ICar {}

interface CarResponse {
  car: ICar;
  total: number;
  limit: number;
  offset: number;
  offsets: number;
}

class CarService {
  constructor(private carsRepository: ICarRepository) {}

  async createCar(data: CreateCarDTO): Promise<ICar> {
    const car = await this.carsRepository.createCar(data);

    return car;
  }

  async getCarById(id: string): Promise<ICar> {
    const car = await this.carsRepository.getCarById(id);

    if (!car) {
      throw new AppError("Id not found", 404);
    }

    return car;
  }

  async listAllCars({model, color, year, value_per_day, accessories, number_of_passengers }: CreateCarDTO) {
    
  }

  async updateCarById(id: string, data: CreateCarDTO): Promise<ICar> {
    if (!mongoose.isValidObjectId(id)) {
      throw new AppError("Invalid id", 400);
    }
  
    const car = await this.carsRepository.updateCarById(id, data);

    if (!car) {
      throw new AppError("Id not found", 404);
    }

    return car;
  }

  async deleteCarById(id: string): Promise<void> {
    const isCarDeleted = await this.carsRepository.deleteCarById(id);

    if (!isCarDeleted) {
      throw new AppError("Event not found", 404);
    }

    return;
  }
}

export { CarService }