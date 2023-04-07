import { ICarRepository } from "../interfaces/ICarRepository";
import { ICar } from "../interfaces/ICar";
import { AppError } from "../errors/AppError";
import { ISearchQuery } from "../interfaces/ISearchQuery";

interface CreateCarDTO extends ICar {}

interface ICarResponse {
  car: ICar[];
  total: number;
  limit: number;
  offset: number;
  offsets: number[];
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

  async listAllCars(data: ISearchQuery, pageNumber?: number, limitNumber?: number): Promise<ICarResponse> {
    let query: Record<string, string> = {}

    for (let [key, value] of Object.entries(data)) {
      if (value) {
        query[key] = value; 
      }
    }

    const page = pageNumber ? pageNumber * 1 : 1;
    const limit = limitNumber ? limitNumber * 1 : 100;
    const skip = (page - 1) * limit;
    
    const carsList = await this.carsRepository.listAllCars(query, skip, limit);
    const total = carsList.length;

    const offsets = Array(Math.ceil(total / limit))
    .fill(0)
    .map((_, i) => i * limit);

    return {
      car: carsList,
      total: total,
      limit: limit,
      offset: skip,
      offsets: offsets
    };
  }
  
  async updateCarById(id: string, data: CreateCarDTO): Promise<ICar> {
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