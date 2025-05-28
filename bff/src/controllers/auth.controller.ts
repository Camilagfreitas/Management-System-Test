import { NextFunction, Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

export class AuthController {
  constructor(private authService = new AuthService()) {}

  login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    try {
      const response = await this.authService.login(email, password);
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  };
}