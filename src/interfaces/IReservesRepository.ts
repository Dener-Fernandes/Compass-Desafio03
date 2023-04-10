import { HydratedDocument } from "mongoose"

import { IReserve } from "./IReserve"

interface CreateReserveDTO extends IReserve {};

interface IReservesRepository {
  createReserve(data: CreateReserveDTO): Promise<HydratedDocument<IReserve>>;
  getReserveById(id: string): Promise<HydratedDocument<IReserve> | null>;
  listAllReserves(query: Object, skip: number, limit: number): Promise<HydratedDocument<IReserve>[]>;
  updateReserveById(id: string, data: CreateReserveDTO): Promise<HydratedDocument<IReserve> | null>;
  deleteReserveById(id: string): Promise<number>;
}

export { IReservesRepository }