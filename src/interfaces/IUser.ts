import { Schema } from "mongoose";

interface IUser {
  id?: Schema.Types.ObjectId;
  name: string;
  cpf: string;
  birth: string;
  email: string;
  password: string;
  cep: string;
  qualified: boolean;
  patio: string;
  complement: string;
  neighbourhood: string;
  locality: string;
  uf: string;
}

export { IUser }
