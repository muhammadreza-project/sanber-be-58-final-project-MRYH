import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { SECRET } from '../utils/env';

export interface IRequest extends Request {
  user?: {
    id: string;
    roles: string[];
  };
}

export default (req: IRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  const [prefix, accessToken] = token.split(" ");

  if (prefix !== "Bearer" || !accessToken) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  const user = jwt.verify(accessToken, SECRET) as { id: string; role: string };

  if (!user) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  req.user = {
    id: user.id,
    roles: [user.role],
  };

  next();
};
