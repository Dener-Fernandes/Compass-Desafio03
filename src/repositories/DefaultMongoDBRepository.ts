import { Model } from "mongoose";
import { IBaseModel } from "../interfaces/IBaseModel";
import { GenericRepository } from "./GenericRepository";
import {
  FilterOptions,
  IWithId,
  PaginationOption01,
  PaginationOption02,
} from "../interfaces";
import { verifyQueryValues } from "../utils/verifyQueryValues";

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

  async listAll(
    query: PaginationOption01,
    offset: PaginationOption02,
    limit: PaginationOption02,
  ): Promise<IWithId<T>[]> {
    const list = await this.model
      .find(verifyQueryValues(query) ? { $or: query } : {})
      .sort({ _id: -1 })
      .skip(offset)
      .limit(limit);
    const newList = list.map((item) => item.toObject<IWithId<T>>());
    return newList;
  }

  async update(id: unknown, data: T): Promise<IWithId<T> | undefined> {
    const car = await this.model.findByIdAndUpdate(id, data, { new: true });

    return car?.toObject<IWithId<T> | undefined>();
  }

  async countItems(): Promise<FilterOptions> {
    return await this.model.countDocuments();
  }

  async delete(id: string): Promise<FilterOptions> {
    const { deletedCount } = await this.model.deleteOne({ _id: id });

    return deletedCount;
  }
}

export { DefaultMongoDBRepository };
