import { HydratedDocument } from "mongoose"
import { IUser } from "./IUser"
import { CreateUserDTO } from "./CreateUserDTO";

interface IUsersRepository {
  createUser(data: CreateUserDTO): Promise<HydratedDocument<IUser>>;
  getUserById(id: string): Promise<HydratedDocument<IUser> | null>;
  listAllUsers(): Promise<HydratedDocument<IUser[]>>;
  updateUser(id: string, data: IUser): Promise<HydratedDocument<IUser> | null>;
  deleteById(id: string): Promise<number>;
}

export { IUsersRepository }