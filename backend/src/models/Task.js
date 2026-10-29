import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        status: {
            type: String,
            enum: ['active', 'completed'],
            default: 'active',
        },
        completedAt: {
            type: Date,
            default: null,
        },
        commentCount: {
        type: Number,
        default: 0,
    }
    }, 
    { 
        timestamps: true, // Tự động thêm createdAt và updatedAt
    }
);

const Task = mongoose.model('Task', taskSchema);
export default Task;