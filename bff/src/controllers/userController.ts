import { Request, Response } from 'express';
import userService from '../services/userService';

export const getAllUsers = async (_: Request, res: Response) => {
  const response = await userService.getUsers();
  res.json(response);
};

export const getUserByEmail = async (req: Request, res: Response) => {
  const response = await userService.getUserByEmail(req.params.email);
  if (response) {
    res.json(response)
  } else {
    res.status(404).json({ message: 'User not found' })
  }
};

export const createUser = async (req: Request, res: Response) => {
  const user = req.body;
  const response = await userService.createUser(user);
  res.status(201).json(response);
}
