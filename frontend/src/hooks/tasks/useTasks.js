// src/hook/tasks/useTasks.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { tasksApi } from '@/api/tasks.api'
export const taskKeys = {
    all: ['tasks'],
    list: () => [...taskKeys.all, 'list'],
    detail: (id) => [...taskKeys.all, 'detail', id],
}


export const useTasks = () => {
    return useQuery({
        queryKey: taskKeys.list(),
        queryFn: () => tasksApi.getAll(),
    })
}

export const useCreateTask = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (task) => tasksApi.create(task),
        onSuccess: () => {
            queryClient.invalidateQueries(taskKeys.list())
        }
    })
}

export const useUpdateTask = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (task) => tasksApi.update(task),
        onSuccess: () => {
            queryClient.invalidateQueries(taskKeys.list())
        }
    })
}