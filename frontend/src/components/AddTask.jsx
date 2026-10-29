import React from 'react'
import { Card } from './ui/card'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Plus } from 'lucide-react'
import { api } from '@/lib/axios'
import { useCreateTask } from '@/hooks/tasks/useTasks'


const AddTask = () => {
  const [data, setData] = React.useState("")
  const {
    mutateAsync: createTask,
    isPending
  } = useCreateTask()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const title = data.trim()
    if (!title) return

    if (isPending) return
    try {
      await createTask({ title })
      setData("")
    } catch (error) {
      console.error("Lỗi khi tạo công việc:", error)
    }
  }

  return (
    <Card className="p-6 border-8 bg-gradient-card shadow-custom-lg">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
        <Input
          type="text"
          placeholder="Thêm công việc mới..."
          className="flex-1 bg-transparent border-2 border-dashed placeholder:text-gray-400 focus:border-primary focus:ring-0"
          value={data}
          onChange={(e) => setData(e.target.value)}
          disabled={isPending}
        />

        <Button
          type="submit"
          variant="gradient"
          size="xl"
          className="px-6"
          disabled={isPending}
        >
          <Plus className="size-5"/>
          {isPending ? 'Đang thêm...' : 'Thêm Công Việc'}
        </Button>
      </form>
       
    </Card>
  )
}

export default AddTask