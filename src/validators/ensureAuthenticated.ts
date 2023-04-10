import { NextFunction, Request, Response } from "express";
import auth from "../config/auth";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

interface IRequest extends Request {
  user?: {
    id: string;
  };
}

async function ensureAuthenticated(req: IRequest, res: Response, next: NextFunction): Promise<void> {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new Error("Token missing");
  }

  const [, token] = authHeader.split(" ");

  const { sub: user_id } = verify(token, auth.secret_token) as IPayload;

  req.user = {
    id: user_id,
  }
  
  return next();
}

export { ensureAuthenticated }