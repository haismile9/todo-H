import express from 'express';
import dotenv from 'dotenv';
import tasksRoute from './routes/tasksRouters.js';
import { connectDB } from './config/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json());

// Routes
app.use('/api/tasks', tasksRoute);

// Kết nối DB 
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server bắt đầu trên cổng ${PORT}`);
  });
});



