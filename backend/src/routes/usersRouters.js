import { createUser, getAllUsers } from "../controllers/usersControllers.js";
import express from "express";


const router = express.Router();

router.get("/", getAllUsers);
router.post("/", createUser);

export default router;