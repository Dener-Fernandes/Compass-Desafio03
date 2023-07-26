import { MongoDBCarRepository } from "../repositories/MongoDBCarRepository";
import { Car } from "../models/Car";
import {
  ICarRepository,
  PaginationOption01,
  PaginationOption02,
} from "../interfaces";
import { ICar } from "../interfaces/ICar";
import { verifyQueryValues } from "../utils/verifyQueryValues";

let carsRepository: ICarRepository;

interface ICarTest extends ICar {
  toObject?(): ICarTest | ICarTest[];
}

interface ICarsExpectedList {
  values: ICarTest[];
  toObject?(): ICarTest | ICarTest[];
  sort(query: { _id: string }): ICarsExpectedList;
  skip(offset: PaginationOption02): ICarsExpectedList;
  limit(limit: PaginationOption02): ICarTest[];
}

describe("carRepository's unit test", () => {
  beforeEach(async () => {
    const carsExpected: ICarTest[] = [
      {
        _id: "64becfc13c54e17e41e4b301",
        model: "Opala",
        color: "Red",
        year: "1974",
        value_per_day: 125.52,
        accessories: [
          {
            description: "It is a red car",
          },
        ],
        number_of_passengers: 4,
        toObject: (): ICarTest => {
          return carsExpected[0];
        },
      },
      {
        _id: "64becf6e3c54e17e41e4b2f8",
        model: "Ford Cortina",
        color: "Green",
        year: "1974",
        value_per_day: 125.52,
        accessories: [
          {
            description: "It is a car",
          },
        ],
        number_of_passengers: 4,
        toObject: (): ICarTest => {
          return carsExpected[1];
        },
      },
      {
        _id: "64becf953c54e17e41e4b2fb",
        model: "Corola",
        color: "Black",
        year: "2008",
        value_per_day: 125.52,
        accessories: [
          {
            description: "It is a night car",
          },
        ],
        number_of_passengers: 4,
        toObject: (): ICarTest => {
          return carsExpected[0];
        },
      },
      {
        _id: "64becfad3c54e17e41e4b2fe",
        model: "Saveiro",
        color: "Red",
        year: "2012",
        value_per_day: 125.52,
        accessories: [
          {
            description: "It is a day car",
          },
        ],
        number_of_passengers: 4,
        toObject: (): ICarTest => {
          return carsExpected[0];
        },
      },
      {
        model: "Corvette",
        color: "Dark Blue",
        year: "2020",
        value_per_day: 125.52,
        accessories: [
          {
            description: "It is a great car",
          },
        ],
        number_of_passengers: 4,
        _id: "64c114b896a4157e1adc7745",
        toObject: (): ICarTest => {
          return carsExpected[0];
        },
      },
    ];

    const carsExpectedList: ICarsExpectedList = {
      values: carsExpected,
      toObject: (): ICarTest[] => {
        // This method should emulate mongoose's toObject method. It is and adapted method.
        return carsExpectedList.values;
      },
      sort(query: { _id: string }): ICarsExpectedList {
        // This method should emulate mongoose's sort method. It is and adapted method.
        return carsExpectedList;
      },
      skip(offset): ICarsExpectedList {
        // This method should emulate mongoose's skip method. The reverse (sort) is
        // done here, and not on the previous method, to avoid using it twice. It is and adapted method.
        this.values = this.values.slice(offset).reverse();
        return carsExpectedList;
      },
      limit: function (limit: number): ICarTest[] {
        // This method should emulate mongoose's limit method. It is and adapted method.
        if (limit) {
          let newValues: ICarTest[] = [];

          for (let i = 0; i < limit; i++) {
            newValues.push(this.values[i]);
          }

          return (this.values = newValues);
        } else {
          return this.values;
        }
      },
    };

    const deletedResult = { acknowledged: true, deletedCount: 1 };
    const documentsQuantity = carsExpected.length;

    Car.create = jest.fn().mockReturnValueOnce(carsExpected[0]);
    Car.findById = jest.fn().mockReturnValueOnce(carsExpected[0]);
    Car.find = jest.fn().mockReturnValueOnce(carsExpectedList);
    Car.findByIdAndUpdate = jest.fn().mockReturnValueOnce(carsExpected[1]);
    Car.countDocuments = jest.fn().mockReturnValueOnce(documentsQuantity);
    Car.deleteOne = jest.fn().mockReturnValueOnce(deletedResult);

    carsRepository = new MongoDBCarRepository(Car);
  });

  it("should be able to create a new car", async () => {
    const car = {
      model: "Opala",
      color: "Red",
      year: "1974",
      value_per_day: 125.52,
      accessories: [
        {
          description: "It is a red car",
        },
      ],
      number_of_passengers: 4,
    };
    const result = await carsRepository.create(car);

    expect(result.model).toBe(car.model);
    expect(result.color).toBe(car.color);
    expect(result.year).toBe(car.year);
    expect(result.value_per_day).toBe(car.value_per_day);
    expect(result.accessories[0].description).toBe(
      car.accessories[0].description,
    );
  });

  it("should be able to find a car by id", async () => {
    const carId = "64becfc13c54e17e41e4b301";
    const result = await carsRepository.getById(carId);

    expect(result?._id).toBe(carId);
  });

  it("should be able to list all the cars (with query params)", async () => {
    const query: PaginationOption01 = [
      { color: "Black" },
      { model: "Saveiro" },
      { "accessories.description": "It is a great car" },
    ];

    const limit = 3;
    const offset = 2;

    const result = await carsRepository.listAll(query, offset, limit);

    expect(result.length).toBe(limit);
  });

  it("should be able to list all the cars (with no query params)", async () => {
    const query: PaginationOption01 = [];

    const limit = 3;
    const offset = 2;

    const result = await carsRepository.listAll(query, offset, limit);

    expect(result.length).toBe(limit);
  });

  it("should be able to update a car by id", async () => {
    const car = {
      _id: "64becf6e3c54e17e41e4b2f8",
      model: "Ford Cortina",
      color: "Green",
      year: "1974",
      value_per_day: 125.52,
      accessories: [
        {
          description: "It is a car",
        },
      ],
      number_of_passengers: 4,
    };
    const carId = "64becf6e3c54e17e41e4b2f8";

    const result = await carsRepository.update(carId, car);

    expect(result?.model).toBe(car.model);
    expect(result?.year).toBe(car.year);
  });

  it("should be able to return the quantity of documents", async () => {
    const result = await carsRepository.countItems();

    expect(result).toBe(5);
  });

  it("should be able to delete a car by id", async () => {
    const carId = "64becfc13c54e17e41e4b301";

    const result = await carsRepository.delete(carId);

    expect(result).toBe(1);
  });

  it("should not be able to find a car by id", async () => {
    const carId = "64becfc13c54e17e41e4b301";

    Car.findById = jest.fn().mockReturnValueOnce(undefined);

    const localCarRepository = new MongoDBCarRepository(Car);

    const result = await localCarRepository.getById(carId);

    expect(result).toBe(undefined);
  });

  it("should not be able to update a car by id", async () => {
    const car = {
      _id: "64becf6e3c54e17e41e4b2f8",
      model: "Ford Cortina",
      color: "Green",
      year: "1974",
      value_per_day: 125.52,
      accessories: [
        {
          description: "It is a car",
        },
      ],
      number_of_passengers: 4,
    };
    const carId = "64becf6e3c54e17e41e4b2f8";

    Car.findByIdAndUpdate = jest.fn().mockReturnValueOnce(undefined);

    const localCarRepository = new MongoDBCarRepository(Car);

    const result = await localCarRepository.update(carId, car);

    expect(result).toBe(undefined);
  });

  it("should be able to return true when finding a query param", async () => {
    const query: PaginationOption01 = [
      { color: "Black" },
      { model: "Saveiro" },
      { "accessories.description": "It is a great car" },
    ];

    const result = await verifyQueryValues(query);

    expect(result).toBe(true);
  });

  it("should be able to return false when not finding any query param", async () => {
    const query: PaginationOption01 = [];

    const result = await verifyQueryValues(query);

    expect(result).toBe(false);
  });
});
