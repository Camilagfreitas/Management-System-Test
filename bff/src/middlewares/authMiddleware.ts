import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from '../errors/AppError';

const SECRET = process.env.JWT_SECRET || 'default_secret';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return next(new AppError('Token não fornecido', 401));
  const token = authHeader.split(' ')[1];
  if (!token) return next(new AppError('Token mal formatado', 401));

  try {
    const payload = jwt.verify(token, SECRET) as { id: string };
    req.userId = payload.id;
    next();
  } catch {
    next(new AppError('Token inválido', 401));
  }
}