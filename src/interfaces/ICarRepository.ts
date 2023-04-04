import { HydratedDocument } from "mongoose";
import { ICar } from "./ICar"

interface CreateCarDTO extends ICar {}

interface ICarRepository {
  createCar(data: CreateCarDTO): Promise<HydratedDocument<ICar>>;
  getCarById(id: string): Promise<HydratedDocument<ICar> | null>;
  listAllCars(searchParamater: string): Promise<HydratedDocument<ICar>[]>;
  updateCar(data: CreateCarDTO): Promise<HydratedDocument<ICar>>;
  deleteCar(id: string): Promise<void>;
}

export { ICarRepository }