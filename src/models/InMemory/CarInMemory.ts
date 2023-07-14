import mongoose from "mongoose";
import { ICar } from "../../interfaces/ICar";

class CarInMemory implements ICar {
  _id?: mongoose.Schema.Types.ObjectId | string;
  model: string;
  color: string;
  year: string;
  value_per_day: number;
  accessories: { description: string }[];
  number_of_passengers: number;

  constructor(car: ICar) {
    this._id = "111";
    this.accessories = [];
    this.model = car.model;
    this.color = car.color;
    this.year = car.year;
    this.value_per_day = car.value_per_day;
    this.accessories = car.accessories;
    this.number_of_passengers = car.number_of_passengers;
  }
}

export { CarInMemory };
