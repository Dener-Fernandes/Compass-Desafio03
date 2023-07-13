import { ICar } from "./ICar";

type IWithId<T> = { _id: string } & T;

type FilterOptions = string | number | Object | unknown;

type PaginationOption01 = Array<Object>;
type PaginationOption02 = number;

interface IBaseRepository<T> {
  create(data: T): Promise<IWithId<T>>;
  getById(id: FilterOptions): Promise<IWithId<T> | undefined>;
  listAll(
    query: PaginationOption01,
    offset: PaginationOption02,
    limit: PaginationOption02,
  ): Promise<IWithId<T>[]>;
  update(id: FilterOptions, data: T): Promise<IWithId<T> | undefined>;
  delete(id: FilterOptions): Promise<FilterOptions>;
}

interface ICarRepository extends IBaseRepository<ICar> {}

export {
  IWithId,
  FilterOptions,
  PaginationOption01,
  PaginationOption02,
  IBaseRepository,
  ICarRepository,
};
