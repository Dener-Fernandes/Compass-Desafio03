import { ICarRepository } from "../interfaces/ICarRepository";
import { ICar } from "../interfaces/ICar";
import { AppError } from "../errors/AppError";

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

  async listAllCars({model, color, year, value_per_day, accessories, number_of_passenger }: CreateCarDTO) {
    
  }

  async deleteCarById(id: string): Promise<void> {
    const isCarDeleted = await this.carsRepository.deleteCarById(id);

    if (!isCarDeleted) {
      throw new AppError("Event not found", 400);
    }

    return;
  }
}

export { CarService }