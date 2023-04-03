import { Schema, model } from "mongoose";
import { ICar } from "../interfaces/ICar";

const carSchema = new Schema<ICar>({
  model: {
    type: "String"
  },
  color: {
    type: "String"
  },
  year: {
    type: "String"
  },
  value_per_day: {
    type: "Number"
  },
  accessories: [{
    description: {
      type: "String"
    }
  }],
  number_of_passenger: {
    type: "Number"
  }
});

const Car = model<ICar>("Car", carSchema);

export { Car }