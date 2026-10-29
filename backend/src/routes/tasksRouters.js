import express from 'express';
import { getAllTasks, createTask, updateTask, deleteTask } from '../controllers/tasksControllers.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

// Lấy danh sách công việc
router.get('/', getAllTasks);

router.post('/',  createTask);

router.put('/:id',  updateTask);

router.delete('/:id', deleteTask);

export default router;
