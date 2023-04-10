import { ICar } from "../../interfaces/ICar";
import { ICarRepository } from "../../interfaces/ICarRepository";
import { CarInMemory } from "../../models/InMemory/CarInMemory";

interface CreateCarDTO extends ICar {}

class CarsRepositoryInMemory implements ICarRepository {
  private static INSTANCE: CarsRepositoryInMemory;
  private cars: ICar[];

  constructor() {
    this.cars = [];
  }

  static getInstance() {
    if (!CarsRepositoryInMemory.INSTANCE) {
      CarsRepositoryInMemory.INSTANCE = new CarsRepositoryInMemory();
    }
    return CarsRepositoryInMemory.INSTANCE;
  }

  async createCar(data: CreateCarDTO): Promise<ICar> {
    const car = new CarInMemory(data);
    await this.cars.push(car);

    return car;
  }
  getCarById(id: string):  Promise<ICar | null> {
    throw new Error("Method not implemented.");
  }
  listAllCars(query: Object, skip: number, limit: number):  Promise<ICar[]> {
    throw new Error("Method not implemented.");
  }
  updateCarById(id: string, data: CreateCarDTO): Promise<ICar | null> {
    throw new Error("Method not implemented.");
  }
  deleteCarById(id: string): Promise<number> {
    throw new Error("Method not implemented.");
  }
  
}

export { CarsRepositoryInMemory };
