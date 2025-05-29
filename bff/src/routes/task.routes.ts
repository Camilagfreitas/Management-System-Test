import { Router } from 'express';
import { TaskController } from '../controllers/task.controller';
import { ensureAuth } from '../middlewares/auth.middleware';
import { TaskService } from '../services/task.service';
import { TaskRepository } from '../repositories/task.repository';

const router = Router();
const taskController = new TaskController(new TaskService(new TaskRepository()));

router.get('/users/:userId', ensureAuth, taskController.listByUser);
router.post('/', ensureAuth, taskController.createForUser);
router.get('/:id', ensureAuth, taskController.getById);
router.put('/:id', ensureAuth, taskController.update);
router.delete('/:id', ensureAuth, taskController.delete);

export default router;