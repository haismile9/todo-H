import React, { useEffect, useState, useMemo } from 'react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { FilterType } from '@/lib/data'
import { useTasks } from '@/hooks/tasks/useTasks'

const StatsAndFilters = ({ selectedStatus, onStatusChange }) => {
  const { data: tasks = [] } = useTasks()



  const counts = useMemo(() => ({
    all: tasks.length,
    active: tasks.filter(task => task.status === 'active').length,
    completed: tasks.filter(task => task.status === 'completed').length,
  }), [tasks])


  return (
    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
      <div className="flex gap-3 ">
        <Badge >
          {counts.active} {FilterType.active}
        </Badge>

        <Badge>
          {counts.completed} {FilterType.completed}
        </Badge>
      </div>

      <div className="flex gap-2">
        <Button
          variant={selectedStatus === 'all' ? 'default' : 'outline'}
          onClick={() => onStatusChange('all')}
        >
          Tất cả
        </Button>

        <Button
          variant={selectedStatus === 'active' ? 'default' : 'outline'}
          onClick={() => onStatusChange('active')}
        >
          Chưa hoàn thành
        </Button>

        <Button

          variant={selectedStatus === 'completed' ? 'default' : 'outline'}
          onClick={() => onStatusChange('completed')}
        >
          Hoàn thành
        </Button>
      </div>
    </div>
  )
}

export default StatsAndFilters