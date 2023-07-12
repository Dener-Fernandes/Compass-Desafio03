import { ICar } from "./ICar";

type IWithId<T> = { _id: string } & T;

type FilterOptions = string | unknown;

interface IBaseRepository<T> {
  create(data: T): Promise<IWithId<T>>;
  getById(id: FilterOptions): Promise<IWithId<T> | undefined>;
}

interface ICarRepository extends IBaseRepository<ICar> {}

export { IWithId, FilterOptions, IBaseRepository, ICarRepository };
