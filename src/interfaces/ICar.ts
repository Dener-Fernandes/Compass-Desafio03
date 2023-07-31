import { Schema } from "mongoose";

interface ICar {
  _id?: Schema.Types.ObjectId | string;
  model: string;
  color: string;
  year: string;
  value_per_day: number;
  accessories: { description: string }[];
  number_of_passengers: number;
}

export { ICar };
