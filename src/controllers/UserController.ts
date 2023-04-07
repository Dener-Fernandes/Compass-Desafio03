import { Request, Response } from "express"
import { CreateUserDTO } from "../interfaces/CreateUserDTO"
import { UsersRepository } from "../repositories/UsersRepository";
import { UserService } from "../services/UserService";

const usersRepository = UsersRepository.getInstance();
const userService = new UserService(usersRepository);

class UserController {
  async createUser(req: Request, res: Response) {
    const data: CreateUserDTO = req.body;

    const { 
      name, 
      cpf, 
      birth, 
      email, 
      password, 
      cep, 
      qualified, 
      patio,
      complement,
      neighbourhood,
      locality,
      uf } = await userService.createUser(data);

    return res.status(201).json(
      { 
      name, 
      cpf, 
      birth, 
      email, 
      password, 
      cep, 
      qualified, 
      patio,
      complement,
      neighbourhood,
      locality,
      uf 
    });
  }
}

export { UserController }