import { AppError } from "../errors/AppError";
import { IReserve } from "../interfaces/IReserve";
import { IReservesRepository } from "../interfaces/IReservesRepository";
import { calculateFinalValue } from "../utils/calculateFInalValue";
import { verifyIfReserveIsValid } from "../utils/verifyIfReserveIsValid";
import { CarService } from "./CarService";
import { UserService } from "./UserService";

interface CreateReserveDTO extends IReserve {};

class ReserveService {
  constructor(
    private reservesRepository: IReservesRepository, 
    private carService: CarService,
    private userService: UserService) {}

  async createReserve(data: CreateReserveDTO) {
    const user = await this.userService.getUserById(data.id_user!);
    const car = await this.carService.getCarById(data.id_car);

    const user_id = String(user.id);
    const car_id = String(car.id);

    const reservesList = await this.listAllReserves();

    if(!user.qualified) {
      throw new AppError("User does not have a driver's license", 400);
    }

    if (!car) {
      throw new AppError("Car not found", 400);
    }

    const isReserveValid = await verifyIfReserveIsValid(user_id, car_id, data.start_date, data.end_date, reservesList);

    if (!isReserveValid.doesUserHaveReserveInThisDate) {
      throw new AppError("User already has reserves in this date", 400);
    }

    if (!isReserveValid.isCarAlreadyReservedInThisDate) {
      throw new AppError("This car is already reserved in this date", 400);
    }

    data.final_value = calculateFinalValue(data.start_date, data.end_date, car.value_per_day);

    const reserve = await this.reservesRepository.createReserve(data);

    return reserve;
  }

  async getReserveById(id: string): Promise<IReserve> {
    const reserve = await this.reservesRepository.getReserveById(id);

    if (!reserve) {
      throw new AppError("Reserve not found", 404);
    }

    return reserve;
  }

 async listAllReserves(): Promise<IReserve[]> {
  const reservesList =  await this.reservesRepository.listAllReserves();
  
  return reservesList;
 }

 async updateReserveById(id: string, data: CreateReserveDTO) {
  const user = await this.userService.getUserById(data.id_user!);
  const car = await this.carService.getCarById(data.id_car);

  const user_id = String(user.id);
  const car_id = String(car.id);
  const reservesList = await this.listAllReserves();

  if(!user.qualified) {
    throw new AppError("User does not have a driver's license", 400);
  }

  if (!car) {
    throw new AppError("Car not found", 400);
  }

  const isReserveValid = await verifyIfReserveIsValid(user_id, car_id, data.start_date, data.end_date, reservesList);

  if (!isReserveValid.doesUserHaveReserveInThisDate) {
    throw new AppError("User already has reserves in this date", 400);
  }

  if (!isReserveValid.isCarAlreadyReservedInThisDate) {
    throw new AppError("This car is already reserved in this date", 400);
  }

  data.final_value = calculateFinalValue(data.start_date, data.end_date, car.value_per_day);

  const reserve = await this.reservesRepository.updateReserveById(id, data);

  return reserve;
 }

  async deleteReserveById(id: string): Promise<void> {
    const isReserveDeleted = await this.reservesRepository.deleteReserveById(id);

    if (!isReserveDeleted) {
      throw new AppError("Reserve not found", 404);
    }

    return;
  }

}

export { ReserveService }