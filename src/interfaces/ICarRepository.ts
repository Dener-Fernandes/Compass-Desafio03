import { HydratedDocument } from "mongoose";
import { ICar } from "./ICar"

interface CarDTO extends ICar {}

interface ICarRepository {
  createCar(data: CarDTO): Promise<HydratedDocument<ICar>>;
  getCarById(id: string): Promise<HydratedDocument<ICar> | null>;
  listAllCars(searchParamater: string): Promise<HydratedDocument<ICar>[]>;
  updateCar(data: CarDTO): Promise<HydratedDocument<ICar>>;
  deleteCar(id: string): Promise<void>;
}

export { ICarRepository }