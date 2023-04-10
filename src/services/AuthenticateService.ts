import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import { IUsersRepository } from "../interfaces/IUsersRepository";
import auth from "../config/auth";

class AuthenticateService {
  constructor(private usersRepository: IUsersRepository) {}

  async authenticateUser(email: string, password: string): Promise<string> {

    const user = await this.usersRepository.getUserByEmail(email);

    const { secret_token, expires_in_token } = auth;

    if (!user) {
      throw new AppError("Email or password incorrect", 400);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Email or password incorrect", 400);
    }

    const token = sign({}, secret_token, {
      subject: user.id,
      expiresIn: expires_in_token,
    });
    
    return token;
  }
}

export { AuthenticateService }

