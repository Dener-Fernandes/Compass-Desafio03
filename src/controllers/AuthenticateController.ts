import { Request, Response } from "express";
import { AuthenticateService } from "../services/AuthenticateService";
import { UsersRepository } from "../repositories/UsersRepository";

interface IRequest {
  email: string;
  password: string;
}

const usersRepository = UsersRepository.getInstance();
const authenticateService = new AuthenticateService(usersRepository);

class AuthenticateController {
  async authenticateUser(req: Request, res: Response) {
    const { email, password }:IRequest = req.body;

    const token = await authenticateService.authenticateUser(email, password);

    res.set('Authorization', `Bearer ${token}`);

    return res.status(200).send();
  }

}

export { AuthenticateController }