import { FilterOptions, IBaseRepository, IWithId } from "../interfaces";

abstract class GenericRepository<T> implements IBaseRepository<T> {
  abstract create(data: T): Promise<IWithId<T>>;
  abstract getById(id: FilterOptions): Promise<IWithId<T> | undefined>;
}

export { GenericRepository };
