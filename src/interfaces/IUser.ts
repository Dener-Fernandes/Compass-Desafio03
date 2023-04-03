import { Schema, model } from "mongoose";
import { IUser } from "../models/User";

const userSchema = new Schema<IUser>({
  name: {
    type: "String"
  },
  cpf: {
    type: "String"
  },
  birth: {
    type: "String"
  },
  email: {
    type: "String"
  },
  password: {
    type: "String"
  },
  cep: {
    type: "String"
  },
  qualified: {
    type: "Boolean"
  },
  patio: {
    type: "String"
  },
  complement: {
    type: "String"
  },
  neighbourhood: {
    type: "String"
  },
  locality: {
    type: "String"
  },
  uf: {
    type: "String"
  }
});

const User = model<IUser>("User", userSchema);

export { User }