import { Schema } from "mongoose"

interface IReserve {
  id_user?: string;
  id_car: string;
  start_date: string;
  end_date: string;
  final_value?: Number;
}

export { IReserve }