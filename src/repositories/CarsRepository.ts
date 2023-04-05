import { HydratedDocument } from "mongoose";
import { ICar } from "../interfaces/ICar";
import { ICarRepository } from "../interfaces/ICarRepository";
import { Car } from "../models/Car";

interface CreateCarDTO extends ICar {}

class CarsRepository implements ICarRepository {
  private static INSTANCE: CarsRepository;

  static getInstance(): CarsRepository {
    if (!CarsRepository.INSTANCE) {
      CarsRepository.INSTANCE = new CarsRepository();
    }

    return CarsRepository.INSTANCE;
  }

  async createCar(data: CreateCarDTO): Promise<HydratedDocument<ICar>> {
    const createdCar = await Car.create(data);

    return createdCar;
  }
  
  getCarById(id: string): Promise<HydratedDocument<ICar> | null> {
    throw new Error("Method not implemented.");
  }
  
  async listAllCars(searchParamater: string): Promise<HydratedDocument<ICar>[]> {
    const cars = await Car.find();

    return cars;
  }

  updateCar(data: CreateCarDTO): Promise<HydratedDocument<ICar>> {
    throw new Error("Method not implemented.");
  }

  async deleteCarById(id: string): Promise<number> {
    const { deletedCount } = await Car.deleteOne({ _id: id });

    return deletedCount;
  }
  
}

export { CarsRepository }