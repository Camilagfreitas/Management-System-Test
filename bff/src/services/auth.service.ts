import { UserRepository } from '../repositories/user.repository';
import { AppError } from '../errors/app-error';
import { comparePassword } from '../utils/hash';
import { generateToken } from '../utils/jwt';
export class AuthService {
  constructor(private userRepo = new UserRepository()) {}

  async login(email: string, password: string): Promise<{ id: string; name: string; token: string; }> {

    const user = await this.userRepo.getUserByEmail(email);
    if (!user) {
      throw new AppError(401, 'Invalid email');
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new AppError(401, 'Invalid password');
    }

    const token = generateToken({ id: user.id, email: user.email });
    return { id: user.id, name: user.name, token: token };
  }
}
