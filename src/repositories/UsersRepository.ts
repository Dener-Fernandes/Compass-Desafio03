import { HydratedDocument} from "mongoose";
import { CreateUserDTO } from "../interfaces/CreateUserDTO";
import { IUser } from "../interfaces/IUser";
import { IUserRepository } from "../interfaces/IUserRepository";
import { User } from "../models/User";

class UsersRepository implements IUserRepository {
  private static INSTANCE: UsersRepository;

  static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  async createUser(data: CreateUserDTO): Promise<HydratedDocument<IUser>> {
    const user = await User.create(data);

    return user;
  }

  async getUserById(id: string): Promise<HydratedDocument<IUser> | null> {
    const user = await User.findById(id);

    return user;
  }

  async listAllUsers(): Promise<HydratedDocument<IUser[]>> {
    throw new Error("Method not implemented.");
  }

  async updateUser(id: string, data: IUser): Promise<HydratedDocument<IUser> | null> {
    const user = await User.findByIdAndUpdate(id, data, { new: true });

    return user;
  }

  async deleteById(id: string): Promise<number> {
    const { deletedCount } = await User.deleteOne({ _id: id });

    return deletedCount;
  }

}

export { UsersRepository }