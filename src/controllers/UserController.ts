import { Request, Response } from "express"
import { CreateUserDTO } from "../interfaces/CreateUserDTO"
import { UsersRepository } from "../repositories/UsersRepository";
import { UserService } from "../services/UserService";
import { ISearchUserQuery } from "../interfaces/ISearchUserQuery";

const usersRepository = UsersRepository.getInstance();
const userService = new UserService(usersRepository);

class UserController {
  async createUser(req: Request, res: Response): Promise<Response> {
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

  async getUserById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

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
      uf 
    } = await userService.getUserById(id);

    return res.status(200).json({ 
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

  async listAllUsers(req: Request, res: Response) {
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
      uf,
      page,
      limit
     }: ISearchUserQuery = req.query; 

     const usersList = await userService.listAllUsers({ 
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
      uf,
     }, page, limit);

     return res.status(200).json(usersList);
  }

  async updateUserById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
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
      uf 
    } = await userService.updateUserById(id, data);


    return res.status(200).json({
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

  async deleteUserById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    await userService.deleteCarById(id);

    return res.status(204).send();
  }
}

export { UserController }