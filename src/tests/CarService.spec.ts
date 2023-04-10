import { CarsRepositoryInMemory } from "../repositories/InMemory/CarsRepositoryInMemory";
import { CarService } from "../services/CarService";

let carRepository = CarsRepositoryInMemory.getInstance();
let carService = new CarService(carRepository);

describe("Create Car", () => {
  beforeEach(() => {
    carRepository = CarsRepositoryInMemory.getInstance();
    carService = new CarService(carRepository);
  });

  it("should be able to create a new car", async () => {
    const car = await carRepository.createCar({
      model: "Ford Cortina",
      color: "Green",
      year: "1974",
      value_per_day: 50,
      accessories: [
          {
              description: "Air conditioner"
          }
      ],
      number_of_passengers: 4
    });

    expect(car).toHaveProperty("id");
  });
}); 