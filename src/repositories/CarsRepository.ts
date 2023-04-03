import { ICar } from "../interfaces/ICar";
import { ICarRepository } from "../interfaces/ICarRepository";

interface CarDTO extends ICar {}

class CarsRepository implements ICarRepository {
  private static INSTANCE: CarsRepository;

  static getInstance(): CarsRepository {
    if (!CarsRepository.INSTANCE) {
      CarsRepository.INSTANCE = new CarsRepository();
    }

    return CarsRepository.INSTANCE;
  }

  createCar(data: CarDTO): Promise<ICar> {
    throw new Error("Method not implemented.");
  }
  
  getCarById(id: string): Promise<ICar | null> {
    throw new Error("Method not implemented.");
  }
  
  listAllCars(searchParamater: string): Promise<ICar[]> {
    throw new Error("Method not implemented.");
  }

  updateCar(data: CarDTO): Promise<ICar> {
    throw new Error("Method not implemented.");
  }

  deleteCar(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  
}

export { CarsRepository }