import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { useTasks } from '@/hooks/tasks/useTasks'


const TaskList = ({ status = 'all' }) => {
  const { data: tasks = [], isLoading, error } = useTasks()

  const visibleTasks = status === 'all'
    ? tasks
    : tasks.filter((task) => task.status === status)

  return (
    <div className='flex-1 flex-col'>
      <Card>
          <CardHeader>
            <CardTitle>Danh sách công việc</CardTitle>
              <CardDescription>
                {isLoading ? 'Đang tải dữ liệu...' : `${visibleTasks.length} công việc`}
              </CardDescription>
          </CardHeader>
        <CardContent >
          {error ? (
            <p className="text-sm text-red-500">{error.message || "Có lỗi xảy ra"}</p>
          ) : null}
          {visibleTasks.length === 0 && !isLoading ? (
            <p className="text-sm text-muted-foreground">Chưa có công việc nào.</p>
          ) : (
            <ul className="space-y-2">
              {visibleTasks.map((task) => (
                <li key={task._id} className="rounded-lg border px-4 py-3 transition-transform duration-200 hover:scale-105">
                  <p className="font-medium">{task.title}</p>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default TaskList
