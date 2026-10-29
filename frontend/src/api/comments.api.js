import {api} from '@/lib/axios'

export const commentsApi = {
    getCommentsByTaskId: async (taskId) => {
        const response = await api.get(`/comments/task/${taskId}`);
        return response.data;
    },
    createComment: async (commentData) => {
        const response = await api.post('/comments', commentData);
        return response.data;
    },
    updateComment: async (commentId, commentData) => {
        const response = await api.put(`/comments/${commentId}`, commentData);
        return response.data;
    },
    deleteComment: async (commentId) => {
        const response = await api.delete(`/comments/${commentId}`);
        return response.data;
    },
}