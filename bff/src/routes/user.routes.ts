import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';
import { UserRepository } from '../repositories/user.repository';

const router = Router();
const userController = new UserController(new UserService(new UserRepository()));

router.get('/:id', userController.getById);
router.post('/', userController.createUser);

export default router;
