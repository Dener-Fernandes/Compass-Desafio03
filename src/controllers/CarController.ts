import { Request, Response } from "express";
import { ICar } from "../interfaces/ICar";
import { CarsRepository } from "../repositories/CarsRepository";
import { CarService } from "../services/CarService";
import { ISearchQuery } from "../interfaces/ISearchQuery";
import { MongoDBCarRepository } from "../repositories/MongoDBCarRepository";

// const carsRepository = CarsRepository.getInstance();
const carService = new CarService(new MongoDBCarRepository());

interface CreateCarDTO extends ICar {}

class CarController {
  async createCar(req: Request, res: Response): Promise<Response> {
    const data: CreateCarDTO = req.body;

    const result = await carService.createCar(data);

    return res.status(201).json(result);
  }

  // async getCarById(req: Request, res: Response): Promise<Response> {
  //   const { id } = req.params;

  //   const {
  //     model,
  //     color,
  //     year,
  //     value_per_day,
  //     accessories,
  //     number_of_passengers
  //    } = await carService.getCarById(id);

  //   return res.status(200).json({
  //     model,
  //     color,
  //     year,
  //     value_per_day,
  //     accessories,
  //     number_of_passengers
  //   });
  // }

  // async listAllCars(req: Request, res: Response) {
  //   const { model, color, year, value_per_day, accessories, number_of_passengers, page, limit }: ISearchQuery = req.query;

  //   const carsList =  await carService.listAllCars({
  //     model,
  //     color,
  //     year,
  //     value_per_day,
  //     accessories,
  //     number_of_passengers
  //   }, page, limit );

  //   return res.status(200).json(carsList);
  // }

  // async updateCarById(req: Request, res: Response): Promise<Response>{
  //   const { id } = req.params;
  //   const data: CreateCarDTO = req.body;

  //   const {
  //     model,
  //     color,
  //     year,
  //     value_per_day,
  //     accessories,
  //     number_of_passengers
  //   } = await carService.updateCarById(id, data);

  //   return res.status(200).json({
  //     model,
  //     color,
  //     year,
  //     value_per_day,
  //     accessories,
  //     number_of_passengers
  //   });
  // }

  // async deleteCarById(req: Request, res: Response): Promise<Response> {
  //   const { id } = req.params;

  //   await carService.deleteCarById(id);

  //   return res.status(204).send();
  // }
}

export { CarController };
