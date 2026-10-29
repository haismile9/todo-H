import {commentsApi} from '@/api/comments.api'
import {useQuery, useMutation} from '@tanstack/react-query'

export const commentKeys = {
    all: ['comments'],
    list: (taskId) => [...commentKeys.all, 'list', taskId],
    detail: (commentId) => [...commentKeys.all, 'detail', commentId],
}

export const useComments = (taskId) => {
    return useQuery({
        queryKey: commentKeys.list(taskId),
        queryFn: () => commentsApi.getCommentsByTaskId(taskId),
    })
}

export const useUpdateComment = () => {
    return useMutation({
        mutationFn: (commentId) => commentsApi.updateComment(commentId),
    })
}

export const useDeleteComment = () => {
    return useMutation({
        mutationFn: (commentId) => commentsApi.deleteComment(commentId),
    })
}

export const useCreateComment = () => {
    return useMutation({
        mutationFn: (commentData) => commentsApi.createComment(commentData),
    })
}