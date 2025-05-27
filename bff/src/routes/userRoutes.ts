import { Router } from 'express';
import * as userController from '../controllers/UserController';

const router = Router();

router.get('/', userController.getAllUsers);
router.get('/email/:email', userController.getUserByEmail);
router.post('/', userController.createUser);

export default router;
