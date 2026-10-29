// src/api/tasks.api.js
import { api} from '@/lib/axios'

export const tasksApi = {
  getAll: async (params) => {
    const response = await api.get('/tasks', { params })
    return response.data
  },
  create: async (body) => {
    const response = await api.post('/tasks', body)
    return response.data
  },
  update: async ({ id, ...body }) => {
    const response = await api.put(`/tasks/${id}`, body)
    return response.data
  },
  remove: async (id) => {
    const response = await api.delete(`/tasks/${id}`)
    return response.data
  },
}
