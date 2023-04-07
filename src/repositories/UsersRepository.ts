import { HydratedDocument} from "mongoose";
import { CreateUserDTO } from "../interfaces/CreateUserDTO";
import { IUser } from "../interfaces/IUser";
import { IUsersRepository } from "../interfaces/IUsersRepository";
import { User } from "../models/User";

class UsersRepository implements IUsersRepository {
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

  async listAllUsers(query: Object, skip: number, limit: number): Promise<HydratedDocument<IUser>[]> {
    const usersList = await User.find(query).skip(skip).limit(limit);

    return usersList;
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