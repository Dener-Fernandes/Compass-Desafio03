import { Schema, model } from "mongoose";
import { IUser } from "../interfaces/IUser";
import bcryptjs from "bcryptjs";

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

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcryptjs.hash(this.password, 12);
  
  next();
});

const User = model<IUser>("User", userSchema);

export { User }