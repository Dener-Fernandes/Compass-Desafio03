import { Model } from "mongoose";
import { IBaseModel } from "../interfaces/IBaseModel";
import { GenericRepository } from "./GenericRepository";
import { IWithId } from "../interfaces";

abstract class DefaultMongoDBRepository<
  T extends IBaseModel
> extends GenericRepository<T> {
  constructor(private model: Model<T>) {
    super();
  }

  async create(data: T): Promise<IWithId<T>> {
    const model = new this.model(data);
    const createdCar = await model.save();
    return createdCar.toObject<IWithId<T>>();
  }
}

export { DefaultMongoDBRepository };
