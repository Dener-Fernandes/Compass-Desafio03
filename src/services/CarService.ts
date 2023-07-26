// import { ICarRepository } from "../interfaces/ICarRepository";
import { ICar } from "../interfaces/ICar";
import { AppError } from "../errors/AppError";
import { ISearchQuery } from "../interfaces/ISearchQuery";
import { FilterOptions, ICarRepository } from "../interfaces";

interface CreateCarDTO extends ICar {}

interface ICarResponse {
  cars: ICar[];
  total: number;
  nextUrl: string | null;
  previousUrl: string | null;
  limit: number;
  offset: number;
}

class CarService {
  constructor(private carsRepository: ICarRepository) {}

  async createCar(data: CreateCarDTO): Promise<ICar> {
    const car = await this.carsRepository.create(data);

    return car;
  }

  async getCarById(id: FilterOptions): Promise<ICar> {
    const car = await this.carsRepository.getById(id);

    if (!car) {
      throw new AppError("Car not found", 404);
    }

    return car;
  }

  async listAllCars(
    data: ISearchQuery,
    offset?: number,
    limit?: number,
    currentUrl?: string,
  ): Promise<ICarResponse> {
    let arrayQuery = [];
    offset = Number(offset);
    limit = Number(limit);

    for (let [key, value] of Object.entries(data)) {
      if (value) {
        if (key == "accessories") {
          arrayQuery.push({ "accessories.description": value });
        } else {
          arrayQuery.push({ [key]: value });
        }
      }
    }

    if (!limit) {
      limit = 5 * 1;
    }

    if (!offset) {
      offset = 0 * 1;
    }

    const carsList = await this.carsRepository.listAll(
      arrayQuery,
      offset,
      limit,
    );

    const total = Number(await this.countCars());

    const next = offset + limit;

    const nextUrl =
      next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null;

    const previous = offset - limit < 0 ? null : offset - limit;
    const previousUrl = previous
      ? `${currentUrl}?limit=${limit}&offset=${previous}`
      : null;

    return {
      cars: carsList,
      total: total,
      nextUrl: nextUrl,
      previousUrl: previousUrl,
      limit: limit,
      offset: offset,
    };
  }

  async updateCarById(id: string, data: CreateCarDTO): Promise<ICar> {
    const car = await this.carsRepository.update(id, data);

    if (!car) {
      throw new AppError("Car not found", 404);
    }

    return car;
  }

  async countCars(): Promise<FilterOptions> {
    const carsQuantity = await this.carsRepository.countItems();

    return carsQuantity;
  }

  async deleteCarById(id: string): Promise<void> {
    const isCarDeleted = await this.carsRepository.delete(id);

    if (!isCarDeleted) {
      throw new AppError("Car not found", 404);
    }

    return;
  }
}

export { CarService };
