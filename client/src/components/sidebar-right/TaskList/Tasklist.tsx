import { useEffect, useState } from 'react'
import { TaskData } from '../../../types/TaskData'
import TaskListItem from './TaskListItem'
import './TaskList.css'

const BASE_URL = 'https://localhost:7159';

function TaskList({ showCompletedTasks } : { showCompletedTasks: boolean }) {
  const [tasks, setTasks] = useState<TaskData[]>([])

  useEffect (() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`${BASE_URL}/APIv1/tasks?includeCompletedTasks=${showCompletedTasks}`)
        const tasks = (await response.json()) as TaskData[]

        setTasks(tasks)
        console.log(tasks)
      } catch (e: any) {
        console.error(e)
      }
    }; fetchTasks()
  }, [])

  return(
    <>
      <h3>Tasks</h3>    
      <div className="task-container">
      { tasks.map((task) => (    
        <TaskListItem key={task.id} task={task} />                        
      ))}
      </div>
    </>
  )
}

export default TaskList