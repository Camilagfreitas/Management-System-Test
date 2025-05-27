import { Request, Response } from 'express';
import { UserService } from '../services/UserService';
import { UserRepository } from '../repositories/userRepository';
import { AppError } from '../errors/AppError';

const userService = new UserService(new UserRepository());

export const getAllUsers = async (_: Request, res: Response) => {
  try {
    const users = await userService.getUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
};
export const getUserByEmail = async (req: Request, res: Response) => {
  try {
    const user = await userService.getUserByEmail(req.params.email);
    if (!user) throw new AppError('Usuário não encontrado', 404);
    res.json(user);
  } catch (err) {
    if (err instanceof AppError) {
      res.status(err.statusCode).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Erro ao buscar usuário' });
    }
  }
};
export const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = await userService.createUser(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
};
