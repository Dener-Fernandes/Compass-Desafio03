import { AppError } from "../errors/AppError";
import { CreateUserDTO } from "../interfaces/CreateUserDTO"
import { ISearchUserQuery} from "../interfaces/ISearchUserQuery";
import { IUser } from "../interfaces/IUser";
import { IUsersRepository } from "../interfaces/IUsersRepository"
import { api } from "../utils/api";

interface IRequest {
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
}

interface IUserResponse {
  user: IUser[];
  total: number;
  limit: number;
  offset: number;
  offsets: number[];
}

class UserService {
  constructor (private usersRepository: IUsersRepository) {}

  async createUser(data: CreateUserDTO) {

    data.qualified = Boolean(data.qualified);

    const addressInfo = await api.get<IRequest>(`/${data.cep}/json`);

    if (addressInfo.status !== 200) {
      throw new AppError("Could not get address information. Try again later", 400);
    }

    const userData: IUser = {
      ...data,
      patio: addressInfo.data.logradouro,
      complement: addressInfo.data.complemento,
      neighbourhood: addressInfo.data.bairro,
      locality: addressInfo.data.localidade,
      uf: addressInfo.data.uf
    }
    
    const user = await this.usersRepository.createUser(userData);

    return user;
  }

  async getUserById(id: string): Promise<IUser> {
    const user = await this.usersRepository.getUserById(id);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return user;
  }

  async listAllUsers(data: ISearchUserQuery, pageNumber?: number, limitNumber?: number): Promise<IUserResponse> {

    let query: Record<string, string> = {}

    for (let [key, value] of Object.entries(data)) {
      if (value) {
        query[key] = value; 
      }
    }

    const page = pageNumber ? pageNumber * 1 : 1;
    const limit = limitNumber ? limitNumber * 1 : 100;
    const skip = (page - 1) * limit;

    const usersList = await this.usersRepository.listAllUsers(query, skip, limit)
    const total = usersList.length;
    const offsets = Array(Math.ceil(total / limit))
    .fill(0)
    .map((_, i) => i * limit);

    return {
      user: usersList,
      total: total,
      limit: limit,
      offset: page,
      offsets: offsets
    }
  }

  async updateUserById(id: string, data:CreateUserDTO): Promise<IUser> {
    data.qualified = Boolean(data.qualified);

    const addressInfo = await api.get<IRequest>(`/${data.cep}/json`);

    if (addressInfo.status !== 200) {
      throw new AppError("Could not get address information. Try again later", 400);
    }

    const userData: IUser = {
      ...data,
      patio: addressInfo.data.logradouro,
      complement: addressInfo.data.complemento,
      neighbourhood: addressInfo.data.bairro,
      locality: addressInfo.data.localidade,
      uf: addressInfo.data.uf
    }
    
    const user = await this.usersRepository.updateUser(id, userData);

    if (!user) {
      throw new AppError("Id not found", 404);
    }

    return user;
  }

  async deleteCarById(id: string): Promise<void> {
    const isUserDeleted = await this.usersRepository.deleteById(id);

    if (!isUserDeleted) {
      throw new AppError("User not found", 404);
    }

    return;
  }

}

export { UserService }