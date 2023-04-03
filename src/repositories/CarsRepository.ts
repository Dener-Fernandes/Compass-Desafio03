import { ICar } from "../interfaces/ICar";
import { ICarRepository } from "../interfaces/ICarRepository";

interface CarDTO extends ICar {}

class CarsRepository implements ICarRepository {
  createCar(data: CarDTO): Promise<ICar> {
    throw new Error("Method not implemented.");
  }
  listAllCars(searchParamater: string): Promise<ICar[]> {
    throw new Error("Method not implemented.");
  }
  deleteCar(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  
}

export { CarsRepository }