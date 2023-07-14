import { Model } from "mongoose";
import { ICarRepository } from "../interfaces";
import { ICar } from "../interfaces/ICar";
import { DefaultMongoDBRepository } from "./DefaultMongoDBRepository";

class MongoDBCarRepository
  extends DefaultMongoDBRepository<ICar>
  implements ICarRepository
{
  constructor(carModel: Model<ICar>) {
    super(carModel);
  }
}

export { MongoDBCarRepository };
