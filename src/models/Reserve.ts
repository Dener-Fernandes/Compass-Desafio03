import { model, Schema } from "mongoose";
import { IReserve } from "../interfaces/IReserve";

const reserveSchema = new Schema<IReserve>({
  id_user: {
    type: "String"
  },
  id_car: {
    type: "String"
  },
  start_date: {
    type: "String"
  },
  end_date: {
    type: "String"
  },
  final_value: {
    type: "Number"
  }
}, { versionKey: false });

const Reserve = model<IReserve>("Reserve", reserveSchema);

export { Reserve }