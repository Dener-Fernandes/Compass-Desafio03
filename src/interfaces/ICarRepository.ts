import { ICar } from "./ICar"

interface CarDTO extends ICar {}

interface ICarRepository {
  createCar(data: CarDTO): Promise<ICar>;
  getCarById(id: string): Promise<ICar | null>;
  listAllCars(searchParamater: string): Promise<ICar[]>;
  updateCar(data: CarDTO): Promise<ICar>;
  deleteCar(id: string): Promise<void>;
}

export { ICarRepository }