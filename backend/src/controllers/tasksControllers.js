import Task from '../models/Task.js';

export const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find().sort({ createdAt: "desc" });
        res.status(200).json(tasks);
    } catch (error) {
        console.error('Lỗi khi lấy danh sách công việc:', error);
        res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
    }
}

export const createTask = async (req, res) => {
    try {
        const { title } = req.body;
        const task = new Task({ title });
        const newTask = await task.save();
        res.status(201).json(newTask);
    } catch (error) {
        console.error('Lỗi khi tạo công việc:', error);
        res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
        
    }
}

export const updateTask = async (req, res) => {
    try {
        const {title, status} = req.body;

        const updateData = { title, status };

        if (status === "completed") {
            updateData.completedAt = new Date();
        } else {
            updateData.completedAt = null;
        }

        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );
        
        if (!updatedTask) {
            return res.status(404).json({ message: 'Công việc không tìm thấy' });
        }

        res.status(200).json(updatedTask);
    } catch (error) {
        console.error('Lỗi khi cập nhật công việc:', error);
        res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
    }
}

export const deleteTask = async (req, res) => {
    try {
         const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if (!deletedTask) {
            return res.status(404).json({ message: 'Công việc không tìm thấy' });
        }
        res.status(200).json({ message: 'Xóa công việc thành công' });
        // Xóa tất cả bình luận liên quan đến task này
        await Comment.deleteMany({ taskId: req.params.id });

    } catch (error) {
        console.error('Lỗi khi xóa công việc:', error);
        res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
    }
}