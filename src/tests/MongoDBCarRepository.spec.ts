import { MongoDBCarRepository } from "../repositories/MongoDBCarRepository";
import { Car } from "../models/Car";

const repository = new MongoDBCarRepository(Car);

const carExpected = {
  _id: "1221",
  model: "Civic",
  color: "Red",
  year: "2000",
  value_per_day: 125.52,
  accessories: [
    {
      description: "É um carro",
    },
  ],
  number_of_passengers: 4,
};
const carExpectedUpdate = {
  _id: "123",
  model: "Ford Cortina",
  color: "Green",
  year: "1974",
  value_per_day: 125.52,
  accessories: [
    {
      description: "É um carro",
    },
  ],
  number_of_passengers: 4,
};

describe("carRepository's unit test", () => {
  beforeEach(() => {
    repository.create = jest.fn().mockReturnValueOnce(carExpected);
    repository.getById = jest.fn().mockReturnValueOnce(carExpected);
    repository.update = jest.fn().mockReturnValueOnce(carExpectedUpdate);
  });

  it("should be able to create a new car", async () => {
    const car = {
      model: "Civic",
      color: "Red",
      year: "2000",
      value_per_day: 125.52,
      accessories: [
        {
          description: "É um carro",
        },
      ],
      number_of_passengers: 4,
    };
    const result = await repository.create(car);

    expect(result.model).toBe(car.model);
    expect(result.color).toBe(car.color);
    expect(result.year).toBe(car.year);
    expect(result.value_per_day).toBe(car.value_per_day);
    expect(result.accessories[0].description).toBe(
      car.accessories[0].description,
    );
  });

  it("should be able to find a car by id", async () => {
    const car = {
      _id: "1221",
      model: "Civic",
      color: "Red",
      year: "2000",
      value_per_day: 125.52,
      accessories: [
        {
          description: "É um carro",
        },
      ],
      number_of_passengers: 4,
    };

    const result = await repository.getById("1221");

    expect(result?._id).toBe(car._id);
  });

  it("should be able to update a car by id", async () => {
    const car = {
      model: "Ford Cortina",
      color: "Red",
      year: "1974",
      value_per_day: 125.52,
      accessories: [
        {
          description: "É um carro",
        },
      ],
      number_of_passengers: 4,
    };
    const result = await repository.update("123", car);

    expect(result?.model).toBe(car.model);
    expect(result?.year).toBe(car.year);
  });
});
