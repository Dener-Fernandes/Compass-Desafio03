import { ICarRepository } from "../interfaces/ICarRepository";
import { ICar } from "../interfaces/ICar";

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
}

export { CarService }