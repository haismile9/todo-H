import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import tasksRoute from './routes/tasksRouters.js';
import usersRoute from './routes/usersRouters.js';
import authRoute from './routes/authRouters.js';
import { connectDB } from './config/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/tasks', tasksRoute);
app.use('/api/users', usersRoute);
app.use('/api/auth', authRoute);

// Kết nối DB 
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server bắt đầu trên cổng ${PORT}`);
  });
});



