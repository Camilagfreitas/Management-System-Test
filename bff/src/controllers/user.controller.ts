import { NextFunction, Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { UserRepository } from '../repositories/user.repository';

export class UserController {
  private userService: UserService;

  constructor(userService = new UserService(new UserRepository())) {
    this.userService = userService;
  }

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.params.id;
      const users = await this.userService.getUserById(userId);
      res.json(users);
    } catch (err) {
      next(err);
    }
  };

  createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newUser = await this.userService.createUser(req.body);
      res.status(201).json(newUser);
    } catch (err) {
      next(err);
    }
  };
}
