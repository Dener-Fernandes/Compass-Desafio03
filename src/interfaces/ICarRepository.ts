import { ICar } from "./ICar"

interface CarDTO extends ICar {}

interface ICarRepository {
  createCar(data: CarDTO): Promise<ICar>;
  listAllCars(searchParamater: string): Promise<ICar[]>;
  deleteCar(id: string): Promise<void>;
}

export { ICarRepository }