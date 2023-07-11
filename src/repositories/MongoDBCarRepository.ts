import { ICarRepository } from "../interfaces";
import { ICar } from "../interfaces/ICar";
import { Car } from "../models/Car";
import { DefaultMongoDBRepository } from "./DefaultMongoDBRepository";

class MongoDBCarRepository
  extends DefaultMongoDBRepository<ICar>
  implements ICarRepository
{
  constructor(carModel = Car) {
    super(carModel);
  }
}

export { MongoDBCarRepository };
