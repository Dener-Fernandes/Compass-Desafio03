import { IBaseRepository, IWithId } from "../interfaces";

abstract class GenericRepository<T> implements IBaseRepository<T> {
  abstract create(data: T): Promise<IWithId<T>>;
}

export { GenericRepository };
