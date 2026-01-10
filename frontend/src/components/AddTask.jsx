import React from 'react'
import { Card } from '@/components/ui/card'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Plus } from 'lucide-react'

const [data, setData] = React.useState("")
const [Loading, setLoading] = React.useState(false)


const AddTask = () => {
  return (
    <Card className="p-6 border-8 bg-gradient-card shadow-custom-lg">
        <div className="flex flex-col gap-3 sm:flex-row">
            <Input
                type="text"
                placeholder="Thêm công việc mới..."
                className="flex-1 bg-transparent border-2 border-dashed placeholder:text-gray-400 focus:border-primary focus:ring-0"
            />

            <Button
                variant="gradient"
                size="xl"
                className="px-6"
            >
                <Plus className="size-5"/> 
                Thêm Công Việc
            </Button>
        </div>
       
    </Card>
  )
}

export default AddTask