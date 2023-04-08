import { Document, HydratedDocument, Types } from "mongoose";
import { IReserve } from "../interfaces/IReserve";
import { IReservesRepository } from "../interfaces/IReservesRepository";
import { Reserve } from "../models/Reserve";

interface CreateReserveDTO extends IReserve {};

class ReservesRepository implements IReservesRepository {
  private static INSTANCE: ReservesRepository;

  static getInstance(): ReservesRepository {
    if (!ReservesRepository.INSTANCE) {
      ReservesRepository.INSTANCE = new ReservesRepository();
    }

    return ReservesRepository.INSTANCE;
  }

  async createReserve(data: CreateReserveDTO): Promise<HydratedDocument<IReserve>> {
    const reserve = await Reserve.create(data);

    return reserve;
  }

  async getReserveById(id: string): Promise<HydratedDocument<IReserve> | null> {
    const reserve = await Reserve.findById(id);

    return reserve;
  }

  async listAllReserves(): Promise<HydratedDocument<IReserve>[]> {
    const reservesList = await Reserve.find();

    return reservesList;
  }

  async updateReserveById(id: string, data: CreateReserveDTO): Promise<HydratedDocument<IReserve> | null> {
    const reserve = await Reserve.findByIdAndUpdate(id, data);

    return reserve;
  }

  async deleteReserveById(id: string): Promise<number> {
    const { deletedCount } = await Reserve.deleteOne({ _id: id }); 

    return deletedCount;
  }
}

export { ReservesRepository }