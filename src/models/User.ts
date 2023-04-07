import { Schema, model } from "mongoose";
import { IUser } from "../interfaces/IUser";

const userSchema = new Schema<IUser>({
  name: {
    type: "String"
  },
  cpf: {
    type: "String",
    unique: true,
  },
  birth: {
    type: "String"
  },
  email: {
    type: "String",
    unique: true,
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
}, { versionKey: false });

const User = model<IUser>("User", userSchema);

export { User }