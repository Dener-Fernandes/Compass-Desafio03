import { HydratedDocument } from "mongoose";
import { ICar } from "../interfaces/ICar";
import { ICarRepository } from "../interfaces/ICarRepository";
import { Car } from "../models/Car";

interface CarDTO extends ICar {}

class CarsRepository implements ICarRepository {
  private static INSTANCE: CarsRepository;

  static getInstance(): CarsRepository {
    if (!CarsRepository.INSTANCE) {
      CarsRepository.INSTANCE = new CarsRepository();
    }

    return CarsRepository.INSTANCE;
  }

  async createCar(data: CarDTO): Promise<HydratedDocument<ICar>> {
    const createdCar = await Car.create(data);

    return createdCar;
  }
  
  getCarById(id: string): Promise<HydratedDocument<ICar> | null> {
    throw new Error("Method not implemented.");
  }
  
  listAllCars(searchParamater: string): Promise<HydratedDocument<ICar>[]> {
    throw new Error("Method not implemented.");
  }

  updateCar(data: CarDTO): Promise<HydratedDocument<ICar>> {
    throw new Error("Method not implemented.");
  }

  deleteCar(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  
}

export { CarsRepository }