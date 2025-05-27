import { NextFunction, Request, Response } from 'express';
import { AuthService } from '../services/AuthService';

const authService = new AuthService();

export class AuthController {
  static async login(req: Request, res: Response, next: NextFunction) {
    try{
    const { email, password } = req.body;
    const token = authService.login(email, password);
    res.json({ token });
    } catch (error) {
      next(error);
    }
  }
}