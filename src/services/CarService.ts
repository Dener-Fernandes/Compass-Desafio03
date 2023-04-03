import { ICarRepository } from "../interfaces/ICarRepository";
import { ICar } from "../interfaces/ICar";

interface ICarDTO extends ICar {}
interface CarResponse {
  car: ICar;
  total: number;
  limit: number;
  offset: number;
  offsets: number;
}

class CarService {
  constructor(private carsRepository: ICarRepository) {}

  async createCar(data: ICarDTO): Promise<CarResponse> {
    const carCreated = await this.carsRepository.createCar(data);

    return {
      car: carCreated,
      total: 0,
      limit: 0,
      offset: 0,
      offsets: 0
    };
  }
}

export { CarService }