import { AppError } from "../errors/AppError";
import { CreateUserDTO } from "../interfaces/CreateUserDTO"
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

}

export { UserService }