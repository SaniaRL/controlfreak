import { TaskData } from '../types/dto/TaskData'

export const mapTasks = (tasks: TaskData[]): TaskData[] => {
  return tasks.map(task => {
    const start = task.completedWhen
      ? task.completedWhen 
      : task.deadline 
        ? task.deadline
        : new Date()
    return {
      ...task,
      start: start,
    }
  })
}

