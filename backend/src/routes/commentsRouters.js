import express from "express";
import { getCommentsByTaskId, createComment, updateComment, deleteComment } from "../controllers/commentControllers.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();


router.get('/:taskId', protect, getCommentsByTaskId);

router.post('/', protect, createComment);

router.put('/:id', protect, updateComment);

router.delete('/:id', protect, deleteComment);

export default router;