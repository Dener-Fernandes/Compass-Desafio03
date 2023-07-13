import {
  FilterOptions,
  IBaseRepository,
  IWithId,
  PaginationOption01,
  PaginationOption02,
} from "../interfaces";

abstract class GenericRepository<T> implements IBaseRepository<T> {
  abstract create(data: T): Promise<IWithId<T>>;
  abstract getById(id: FilterOptions): Promise<IWithId<T> | undefined>;
  abstract listAll(
    query: PaginationOption01,
    offset: PaginationOption02,
    limit: PaginationOption02,
  ): Promise<IWithId<T>[]>;
  abstract update(id: FilterOptions, data: T): Promise<IWithId<T> | undefined>;
  abstract delete(id: FilterOptions): Promise<FilterOptions>;
}

export { GenericRepository };
