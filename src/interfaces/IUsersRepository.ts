import { HydratedDocument } from "mongoose"
import { IUser } from "./IUser"
import { CreateUserDTO } from "./CreateUserDTO";

interface IUsersRepository {
  createUser(data: CreateUserDTO): Promise<HydratedDocument<IUser>>;
  getUserById(id: string): Promise<HydratedDocument<IUser> | null>;
  getUserByEmail(email: string): Promise<HydratedDocument<IUser> | null>;
  listAllUsers(query: Object, skip: number, limit: number): Promise<HydratedDocument<IUser>[]>;
  updateUser(id: string, data: IUser): Promise<HydratedDocument<IUser> | null>;
  deleteById(id: string): Promise<number>;
}

export { IUsersRepository }