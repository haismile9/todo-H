import User from "../models/User.js";
import Comment from "../models/Comment.js";
import Task from "../models/Task.js";

export const createComment = async (req, res) => {
    try {
        const { content, taskId } = req.body;
        const userId = req.user.id;

        const newComment = await Comment.create({
            content,
            taskId,
            userId,
        });
         await Task.findByIdAndUpdate(taskId, { $inc: { commentCount: 1 } });
        res.status(201).json(newComment);
    } catch (error) {
        console.error('Lỗi khi tạo bình luận:', error);
        res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
    }
}

export const getCommentsByTaskId = async (req, res) => {
    try {
        const taskId = req.params.taskId || req.params.id; // Lấy từ taskId hoặc id
        const comments = await Comment.find({ taskId });
        res.status(200).json(comments);
    } catch (error) {
        console.error('Lỗi khi lấy bình luận theo ID công việc:', error);
        res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
    }
}

export const updateComment = async (req, res) => {
    try {
        const {id} = req.params;
        const {content} = req.body;
        
        if (!content || content.trim().length < 1){
            return res.status(400).json({message: "Nội dung bình luận không được để trống"})
        }

        const updatedComment = await Comment.findByIdAndUpdate(id, {content}, {new: true});
        if(!updatedComment) {
            return res.status(404).json({message: 'Bình luận không tìm thấy'});
        }
        res.status(200).json(updatedComment);
    } catch (error) {
        console.error('Lỗi khi cập nhật bình luận:', error);
        res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });

        }
}

export const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedComment = await Comment.findByIdAndDelete({
            _id: id,
            userId: req.user.id
        });

        if (!deletedComment) {
            return res.status(404).json({ message: 'Bình luận không tìm thấy hoặc không có quyền xóa' });
        }

        // Trừ 1 comment count
        await Task.findByIdAndUpdate(
            deletedComment.taskId, 
            { $inc: { commentCount: -1 } });
        res.status(200).json(deletedComment);
    } catch (error) {
        console.error('Lỗi khi xóa bình luận:', error);
        res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
    }
};


