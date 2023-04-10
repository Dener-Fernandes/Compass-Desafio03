import { HydratedDocument } from "mongoose";
import { ICar } from "./ICar"

interface CreateCarDTO extends ICar {}

interface ICarRepository {
  createCar(data: CreateCarDTO): Promise<HydratedDocument<ICar> | ICar>;
  getCarById(id: string): Promise<HydratedDocument<ICar> | ICar | null>;
  listAllCars(query: Object, skip: number, limit: number): Promise<HydratedDocument<ICar>[] | ICar[]>;
  updateCarById(id: string, data: CreateCarDTO): Promise<HydratedDocument<ICar> | ICar | null>;
  deleteCarById(id: string): Promise<number>;
}

export { ICarRepository }