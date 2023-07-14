import { ICarRepository, IWithId } from "../../interfaces";
import { IBaseModel } from "../../interfaces/IBaseModel";
import { ICar } from "../../interfaces/ICar";
import { Car } from "../../models/Car";
import { CarInMemory } from "../../models/InMemory/CarInMemory";
import { DefaultMongoDBRepository } from "../DefaultMongoDBRepository";

interface CreateCarDTO extends ICar {}

class CarsRepositoryInMemory
  extends DefaultMongoDBRepository<ICar>
  implements ICarRepository
{
  private static INSTANCE: CarsRepositoryInMemory;
  private cars: ICar[];

  constructor(model = Car) {
    super(model);
    this.cars = [];
  }

  static getInstance() {
    if (!CarsRepositoryInMemory.INSTANCE) {
      CarsRepositoryInMemory.INSTANCE = new CarsRepositoryInMemory();
    }
    return CarsRepositoryInMemory.INSTANCE;
  }

  async create(data: ICar): Promise<IWithId<ICar>> {
    const car = new CarInMemory(data) as IWithId<ICar>;
    await this.cars.push(car);

    return car;
  }
}

export { CarsRepositoryInMemory };
