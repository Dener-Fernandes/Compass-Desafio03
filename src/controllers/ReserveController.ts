import { Request, Response } from "express";
import { IReserve as CreateReserveDTO} from "../interfaces/IReserve";
import { ReservesRepository } from "../repositories/ReservesRepository";
import { ReserveService } from "../services/ReserveService";
import { Schema } from "mongoose";
import { CarsRepository } from "../repositories/CarsRepository";
import { CarService } from "../services/CarService";
import { UsersRepository } from "../repositories/UsersRepository";
import { UserService } from "../services/UserService";
import { ISearchReserveQuery } from "../interfaces/ISearchReserveQuery";

interface IRequest extends Request {
  user?: {
    id: string;
  };
}

const carsRepository = CarsRepository.getInstance();
const carService = new CarService(carsRepository);

const usersRepository = UsersRepository.getInstance();
const userService = new UserService(usersRepository);

const reservesRepository = ReservesRepository.getInstance();
const reserveService = new ReserveService(reservesRepository, carService, userService);

class ReserveController {
  async createReserve(req: IRequest, res: Response): Promise<Response> {
    const data: CreateReserveDTO = req.body;
    data.id_user  = req.user?.id!;

    const reserve = await reserveService.createReserve(data);

    return res.status(201).json(reserve);
  }

  async getReserveById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const reserve = await reserveService.getReserveById(id);

    return res.status(200).json(reserve);
  }

  async listAllReserves(req: Request, res: Response): Promise<Response> {
    const { id_user, id_car, start_date, end_date, final_value, page, limit }: ISearchReserveQuery = req.query;
    const reservesList = await reserveService.listAllReserves({ 
      id_user, 
      id_car, 
      start_date, 
      end_date, 
      final_value 
    }, page, limit);

    return res.status(200).json({ reserves: reservesList });
  }

  async updateReserve(req: IRequest, res: Response): Promise<Response> {
    const { id } = req.params;
    const data: CreateReserveDTO = req.body;
    data.id_user = req.user?.id!;

    const reserve = await reserveService.updateReserveById(id, data);

    return res.status(200).json(reserve);
  }

  async deleteReserveById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    await reserveService.deleteReserveById(id);

    return res.status(204).send();
  }
}

export { ReserveController }