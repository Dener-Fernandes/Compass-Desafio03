import { ICar } from "./ICar";

type IWithId<T> = { _id: string } & T;

interface IBaseRepository<T> {
  create(data: T): Promise<IWithId<T>>;
}

interface ICarRepository extends IBaseRepository<ICar> {}

export { IWithId, IBaseRepository, ICarRepository };
