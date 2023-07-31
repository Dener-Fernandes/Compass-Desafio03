import { HydratedDocument } from "mongoose";
import { ICar } from "../interfaces/ICar";
import { Car } from "../models/Car";

interface CreateCarDTO extends ICar {}

class CarsRepository {
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

  async getCarById(id: string): Promise<HydratedDocument<ICar> | null> {
    const car = await Car.findById(id);

    return car;
  }

  async listAllCars(
    query: Object,
    skip: number,
    limit: number,
  ): Promise<HydratedDocument<ICar>[]> {
    const cars = await Car.find(query).skip(skip).limit(limit);

    return cars;
  }

  async updateCarById(
    id: string,
    data: CreateCarDTO,
  ): Promise<HydratedDocument<ICar> | null> {
    const car = await Car.findByIdAndUpdate(id, data, { new: true });

    return car;
  }

  async deleteCarById(id: string): Promise<number> {
    const { deletedCount } = await Car.deleteOne({ _id: id });

    return deletedCount;
  }
}

export { CarsRepository };
