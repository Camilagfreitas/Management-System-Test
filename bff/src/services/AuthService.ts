import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/userRepository';
import { AppError } from '../errors/AppError';

export class AuthService {
  private userRepository = new UserRepository();

  async login(email: string, password: string): Promise<string> {
  const SECRET = process.env.JWT_SECRET;
    
    if (!SECRET){
      throw new AppError('JWT_SECRET não configurado', 500);
    } 
    
    const user = await this.userRepository.fetchByEmail(email);
    if (!user) {
      throw new AppError('Usuário não encontrado', 404);
    }

    const match = bcrypt.compare(password, user.password);
    if (!match) {
      throw new AppError('Senha incorreta', 401);
    }

    return jwt.sign({ id: user.id }, SECRET, { expiresIn: '1d' });
  }
}
