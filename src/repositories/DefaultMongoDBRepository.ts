import { Model } from "mongoose";
import { IBaseModel } from "../interfaces/IBaseModel";
import { GenericRepository } from "./GenericRepository";
import { FilterOptions, IWithId } from "../interfaces";

/* extends IBaseModel é mais uma questão de visibilidade. Serve apenas para falar ao TS
que T extende uma interface. O código funciona sem esse extends. */
abstract class DefaultMongoDBRepository<
  T extends IBaseModel,
> extends GenericRepository<T> {
  constructor(private model: Model<T>) {
    super();
  }

  async create(data: T): Promise<IWithId<T>> {
    const createdCar = await this.model.create(data);
    return createdCar.toObject<IWithId<T>>();
  }

  async getById(id: FilterOptions): Promise<IWithId<T> | undefined> {
    const foundCar = await this.model.findById(id);
    return foundCar?.toObject<IWithId<T> | undefined>();
  }
}

export { DefaultMongoDBRepository };
