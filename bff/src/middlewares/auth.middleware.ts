import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { AppError } from '../errors/app-error';

export function ensureAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new AppError(401, 'Token not provided');
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch {
    throw new AppError(401, 'Invalid token');  }
}
