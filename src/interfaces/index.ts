import { ICar } from "./ICar";

type IWithId<T> = { _id: string } & T;

type FilterOptions = string | number | unknown;

interface IBaseRepository<T> {
  create(data: T): Promise<IWithId<T>>;
  getById(id: FilterOptions): Promise<IWithId<T> | undefined>;
  update(id: FilterOptions, data: T): Promise<IWithId<T> | undefined>;
  delete(id: FilterOptions): Promise<FilterOptions>;
}

interface ICarRepository extends IBaseRepository<ICar> {}

export { IWithId, FilterOptions, IBaseRepository, ICarRepository };
